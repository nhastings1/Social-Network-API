# Social Network API 💬

## Description 📝

This is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. It uses Express.js, MongoDB database, Mongoose, and Moment.js.

## Table of Contents 📖


- [Installation 🗳](#installation-)
- [Usage 💡](#usage-)
- [Technologies 🔧](#technologies-)
- [Credits 🙌](#credits-)


## Installation 🗳

- Download or clone repository to use this application on local machine.
- Node.js and MongoDB is required to run the application
- To install necessary dependencies, navigate to the root directory and run the following command:
  npm i


After installation :

- To invoke the application, run npm start.
- When the server is started, the Mongoose models are synched to the MongoDB database.
- Open MongoDB and connect to the MongoDB URI mongodb://localhost:3000. On the list of databases, click on socialDB to see thoughts and users data.
- To create seed data and test the API routes, use [Insomnia](https://insomnia.rest/download). 

## Technologies 🔧

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Insomnia](https://insomnia.rest/)
- [Moment.js](https://www.npmjs.com/package/moment)


📁 **USER**

- Create a new user: `POST /api/users`
- Get all users: `GET /api/users`
- Get a single user by its `id`: `GET /api/users/:userId`

- Update a user by its `id`: `PUT /api/users/:userId`

- Delete a user by its `id`: `DELETE /api/user/:userId`

📁 **FRIEND**

- Add a new friend to a user's friend list: `POST /api/users/:userid/friends/:friendId`
- Delete a friend from a user's friend list: `DELETE /api/users/:userid/friends/:friendId`

📁 **THOUGHT**

- Create a new thought: `POST /api/thoughts/`
- Get all thoughts: `GET /api/thoughts/`
- Get a single thought by its `id`: `GET /api/thoughts/:thoughtId`
- Update a thought by its `id`: `PUT /api/thoughts/:thoughtId`
- Delete a thought by its `id`: `DELETE /api/thoughts/:thoughtId`

📁 **REACTION**

- Create a reaction: `POST /api/thoughts/:thoughtId/reactions`
- Delete a reaction by the `reactionId`: `DEL /api/thoughts/:thoughtId/reactions/:reactionId`

## License 📜


MIT License


## Credits 🙌

Nick Hastings