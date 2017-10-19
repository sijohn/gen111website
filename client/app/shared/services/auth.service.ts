import { MdSnackBar } from '@angular/material';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { tokenNotExpired, AuthHttp, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { Settings } from './../../settings';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthService {
    loggedIn: boolean = false;
    isAdmin: boolean = false;
    authToken: any;
    token: string;
    userRoles: any = Settings.userRoles || [];
    jwtHelper: JwtHelper = new JwtHelper();
    currentUser = { _id: '', name: '', email: '', role: '', avatar: '' };

    constructor(private userService: UserService, private router: Router, private snack: MdSnackBar) {
        const token = localStorage.getItem('id_token') || Cookie.get('token'); //Cookies set through auth strategy
        if (token && token !== 'null') {
            const decodedUser = this.decodeUserFromToken(token);
            this.setCurrentUser(decodedUser);
            if (this.jwtHelper.isTokenExpired(token)) {
                this.logout();
            }
        }
    }
    isLoggedIn() {
        return tokenNotExpired();
    }
    isSessionExpired(token) {
        return this.jwtHelper.isTokenExpired(token);
    }
    login(emailAndPassword) {
        return this.userService.login(emailAndPassword).map(res => res.json()).map(
            res => {
                localStorage.setItem('id_token', res.token);
                const decodedUser = this.decodeUserFromToken(res.token);
                this.setCurrentUser(decodedUser);
                return this.loggedIn;
            }
        );
    }
    register(user) {
        return this.userService.register(user).map(res => res.json()).map(
            res => {
                localStorage.setItem('id_token', res.token);
                const decodedUser = this.decodeUserFromToken(res.token);
                this.setCurrentUser(decodedUser);
                return this.loggedIn;
            }
        );
    }
    logout(url?: string) {
        localStorage.removeItem('id_token');
        Cookie.delete('token');
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = { _id: '', name: '', email: '', role: '', avatar: '' };
        let navigateUrl = url || '/';
        this.router.navigate([navigateUrl]);
    }
    decodeUserFromToken(token) {
        return this.jwtHelper.decodeToken(token);
    }

    setCurrentUser(decodedUser) {
        this.loggedIn = true;
        this.currentUser._id = decodedUser._id;
        this.currentUser.email = decodedUser.email;
        this.currentUser.name = decodedUser.name;
        this.currentUser.avatar = decodedUser.avatar;
        this.currentUser.role = decodedUser.role;
        decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
        // delete decodedUser.role;
    }
    updateProfile(user) { // Used for edit-profile page
        this.currentUser.avatar = user.avatar;
        this.currentUser.name = user.name;
    }
    saveProfile(data) {
        return this.userService.saveProfile(this.currentUser._id, data).map(res => res.json()).map(
            res => { return res; }
        );
    }
    changePassword(data) {
        return this.userService.changePassword(this.currentUser._id, data.oldPassword, data.newPassword).map(
            res => {
                this.snack.open(res.json().message, 'OK', { duration: 2000 });
                return res.json() || [];
            }
        ).catch(this.handleError);
    }
    hasRole(role: string) {
        return this.currentUser ? this.userRoles.indexOf(this.currentUser.role) >= this.userRoles.indexOf(role) : false;
    }
    getToken() {
        return 'Bearer ' + localStorage.getItem('id_token');
    }
    handleError(err: any) {
        return Observable.throw(err || 'Server error');
    }
}

