# BITBOSS FRONTEND TEST

This test is made to summarily evaluate new frontend develpers who want to join the awesome BitBoss’ developer team. There is no a right way to do it, the point of this test is to evaluate how developers can solve a frontend problem with no guide to do it.
The time we think it will be needed to finish all requirements is approximatly 1 hour.
Good luck.

# BEFORE TO START
To accomplish this test is required a base acknowledge of
- Vue.js
- Tailwind
- Bootstrap
- Npm
- Webpack
- Git flow


You are required to build a mini single page application to solve the following problem:
**Allow a user to send a friend request to another one.**

Start with fork the project's repository.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# REQUIREMENT 1: STYLING
As a frontend developer, you are required to build the UI/UX of the application based on this mockup:
https://www.figma.com/file/KE0SY7pE0sH4W1l33fXifG/Persona?node-id=2%3A72

You can choose between using Bootstrap 5 or Tailwind to build required pages (we would prefer Tailwind)

Pages to build:
- Index: a list of “people” coming from our api in json format;
- Show: proper page of a “person” contained in “people”.

We will evaluate css, scss code as well.

# REQUIREMENT 2: LOGIC
As a frontend developer, you are required to implement logic to allow user send a friend request to another user.

First  of all, you need to retrieve “people” list from our API from:
https://api.airtable.com/v0/app7cLoZ4xMOrQvKR/People

Once this is done, you are required to create a route to render a “show view” of one person. 
To retrieve specific user data use a GET request to this endpoint: https://api.airtable.com/v0/app7cLoZ4xMOrQvKR/People/$person_id

Inside the show view, clicking on “Invia richiesta di amicizia” should fire a POST request to another endpoint: https://api.airtable.com/v0/app7cLoZ4xMOrQvKR/Friend%20request

Ask us for the Api key at jobs@bitboss.it

**Hint: Not all people can receive a friend request…**

The test is concluded when a new record is created in the FRIEND REQUEST TABLE.

Once you think you have finished your test, please **open a Pull Request** on the repository and wait for our response.

Thanks for reading and good luck again.
