import User from './user.model';
import BaseCtrl from './../base';
import Config from '../../config';
import * as jwt from 'jsonwebtoken';
import * as async from 'async';
import * as crypto from 'crypto';
import * as _ from 'lodash';
import Email from '../sendmail/'
let email = new Email();
import AuthService from './../../auth/auth.service';
let auth = new AuthService();
let config = new Config();

export default class UsersCtrl extends BaseCtrl {
    model = User;
    validationError = (res, statusCode) => {
        statusCode = statusCode || 422;
        return function (err) {
            if (err.errors && err.errors.email.message) {
                err = err.errors.email;
            }
            return res.status(statusCode).json(err);
        };
    }
    handleError = (res, statusCode) => {
        statusCode = statusCode || 500;
        return function (err) {
            return res.status(statusCode).send(err);
        };
    }
    // Reset password route
    reset = (req, res, next) => {
        console.log('reset');
        async.waterfall([
            function (done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                    if (!user) {
                        return res.status(422).json({ 'message': 'Password reset email is invalid or has expired.' });
                    }

                    user.password = req.body.password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    req.body.to = user.email
                    user.save()
                        .then(function () {
                            email.send(config.resetPasswordEmail(req.body));
                            return res.status(200).json({ 'message': 'Success! Your password has been changed.' });
                        })
                        .catch(function (err) {
                            let statusCode = 422;
                            return function (err) {
                                if (err.errors && err.errors.email.message) {
                                    err = err.errors.email;
                                }
                                return res.status(statusCode).json(err);
                            }
                        });
                });
            }
        ], function (err) {
            if (err) return next(err);
        });
    }
    // Forgot password route
    forgot = (req, res, next) => {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                User.findOne({ email: req.body.email })
                    .then(user => {
                        if (!user) {
                            return res.status(422).json({ 'message': 'No account with that email address exists.' });
                        }
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function (err) {
                            done(err, token, user);
                        });
                    });
            },
            function (token, user, done) {
                // req.body.headers =  req.headers
                req.body.to = user.email;
                req.body.host = req.headers.host;
                req.body.token = token;
                email.send(config.forgotPasswordEmail(req.body));
                return res.status(200).json({ 'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
            }
        ], function (err) {
            if (err) return next(err);
        });
    }

    getAll = (req, res) => {
        var q = {};
        var query = this.toJson(req.query);
        if (query) {
            if (this.toJson(query.where)) q = this.toJson(query.where);
            var select = this.toJson(query.select);
            var sort = query.sort;
            var skip = parseInt(query.skip);
            var limit = parseInt(query.limit);
        }
        return User.find(q, '-salt -password').limit(limit).skip(skip).sort(sort).select(select).exec()
            .then(users => {
                return res.status(200).json(users);
            })
            .catch(this.handleError);
    }

    /**
     * Creates a new user
     */
    create = (req, res) => {
        var newUser = new User(req.body);
        newUser.provider = 'local';
        var role = newUser.role || 'user';
        newUser.role = role;
        newUser.save()
            .then(function (user) {
                var token = AuthService.signToken(user);
                res.status(200).json({ token: token, user: { email: user.email, name: user.name, role: user.role, provider: user.provider, token: token } });
            })
            .catch(function (err) {
                if (err.errors && err.errors.email.message) {
                    err = err.errors.email.message;
                }
                res.status(422).json({ message: err });
            });
    }
    /**
     * Change a users password
     */
    changePassword = (req, res) => {
        var userId = req.user._id;
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);
        return User.findById(userId).exec()
            .then(user => {
                if (user.authenticate(oldPass)) {
                    user.password = newPass;
                    return user.save()
                        .then(() => {
                            return res.status(200).send({ message: 'Password changed successfully' });
                        })
                        .catch(this.validationError);
                } else {
                    return res.status(403).send({ message: 'Incorrect old Password' });
                }
            });
    }

    /**
     * Get my info
     */
    me = (req, res, next) => {
        var userId = req.user._id;

        return User.findOne({ _id: userId }, '-salt -password').exec()
            .then(user => { // don't ever give out the password or salt
                if (!user) {
                    return res.status(401).end();
                }
                return res.json(user);
            })
            .catch(err => next(err));
    }

    /**
     * Authentication callback
     */
    authCallback = (req, res) => {
        res.redirect('/');
    }
}


