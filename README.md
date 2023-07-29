# rest-api-mongo-swagger

# How to use

## 1. Clone Project into your local machine
```
git clone https://github.com/SerhiiNikif/rest-api-mongo-swagger.git
```

## 2. Go into project folder

```
cd rest-api-mongo-swagger
```

## 3. Setting environment file .env.
Create an `.env` file in the root of the project and fill it with the values ​​from the `.env.sample` file.

```
MONGO_URL=mongodb://localhost:27017/db
PORT=4000
BCRYPT_SALT=10
JWT_SECRET=SECRET_VALUE
PBANK_API_URL=https://api.privatbank.ua/p24api/pubinfo
```

## 4. Start project

```
npm install
```

```
npm run dev
```

## 5. Play with APIs now !
> Please make sure mongoDB Server service is installed and running on your localhost:27017.

Now, you are ready to test all APIs.
Just simply open your browser http://localhost:4000/api-docs.

## APIs Authorization

> All APIs are protected by accessToken (JWT).

### When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.

```
Authorization: Bearer <accessToken>
```

### How to get accessToken ?

When user login sucessfully, an unique accessToken will be returned.
