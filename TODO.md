# security
- Add ORM Hooks to encrypt passwords `done`
- encrypt the ticket QR code string `done`
- Add cors to allow external access `done`
- check images meme-type
- Add restrictions to cors


# routes
- Fix "game", "league", "team" routers `done`
- Add search and pagination queries `done`
- Finish "seat" router `done`
- Add more routes to "league" and "team" routers `done`


# authentication
- Confirm emails before submitting users
```
(!) using "nodemailer" i guess .. will see
```
- Fix the admin login process
```
(!) SKETCHY-CODE
```

# general
- Improve MVC architecture `done`
- Add the ability to Upload images `done`
- Add the ability to Serve images `done`
- Fix sequelize associations `done`
- Add custom ORM validation messages `done`
- Fix status Codes `done`
- Improve the response template `done`
- Fix sequelize error template `done`
- Generate PDF files instead of QR code images `done`
- Fix models validation `done`
- Validate body, query and params `done`
- Add ORM scopes to reuse the code `done`
```
(!) There is no use case for scopes at the moment
```
- Add documentation
- Do some code refactoring

- Integrate [Chargily](https://github.com/Chargily/chargily-epay-js) services
- Integrate [Stripe](https://www.stripe.com) API


# optional
- Add Unit Tests
- Add Refresh Tokens
- Confirm emails using random digits
- Add cron to delete inactive users after a period of time
- Add cron to delete tickets of finished games