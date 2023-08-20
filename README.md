# advanced-auth-pagination

# How to use

## 1. Clone Project into your local machine
```
git clone https://github.com/SerhiiNikif/advanced-auth-pagination.git
```

## 2. Go into project folder

```
cd advanced-auth-pagination
```

## 3. Setting environment file .env.
Create an `.env` file in the root of the project and fill it with the values ​​from the `.env.sample` file.

```
MONGO_URL=local_database_url OR cloud_database_service_url
PORT=4000
JWT_ACCESS_SECRET=jwt-secret-key
JWT_REFRESH_SECRET=jwt-refresh-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email
GOOGLE_GEN_PASSWORD=generated app_password in google account
API_URL=http://localhost:4000
CLIENT_URL=https://google.com
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
