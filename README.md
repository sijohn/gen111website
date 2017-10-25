
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
npm run dev
```
go to [http://0.0.0.0:4200](http://0.0.0.0:4200) or [http://localhost:4200](http://localhost:4200) in your browser

## Build for production
```bash
npm run prod
```
The production version files will be available inside dist directory

## Deploy to Heroku

1. Run the command `npm run prod` 

2. Install mLab heroku addon
```
heroku addons:create mongolab
```

3. Upload everything inside dist directory to Heroku

4. Check heroku logs `heroku logs --tail` for any error