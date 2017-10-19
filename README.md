
# ShopNx - [MEAN] Angular4 + Node + Mongo

## Single page ecommerce using Angular4.

## Quick start
> Make sure you have **Node** version >= 8.0, **NPM** >= 5 and **MongoDB**

> Download and unzip the file from codecanyon

> Start mongodb in a separate shell

In Windows operating system we can start it by opening the following file

```bash
C:/Program Files/MongoDB/Server/3.2/bin/mongod.exe
```

```bash
# navigate inside the directory
cd shopnx

# install the dependencies with npm
npm i

# Start the server and client
npm start
```
go to [http://0.0.0.0:4200](http://0.0.0.0:4200) or [http://localhost:4200](http://localhost:4200) in your browser

## Build for production
```bash
npm run prod
```
The production version files will be available inside dist directory

## Deploy to Heroku

1. From command prompt navigate inside the dist directory

2. Copy .env, package.json to dist directory

3. Create a new File named Procfile

4. Add `web: node server/app` into Procfile

5. Install mLab heroku addon
```
heroku addons:create mongolab
```

6. Get MongoDB URI
```
heroku config:get MONGODB_URI
```
*MONGODB_URI => mongodb://heroku_12345678:random_password@ds029017.mLab.com:29017/heroku_12345678*


7. Open `.env` file and change the MONGODB_URI to the above generated URI