# Survey (web application)
[![build status](https://travis-ci.org/mikhail-angelov/survey.svg?branch=master)](https://travis-ci.org/mikhail-angelov/survey)

## [live app](https://survey-fpzpztflxb.now.sh)

## Description
This is web application to conduct online Survey. Every user can create new Survey by typing a question and press `Create new Survey` button. User will get a link for this surrevey and share this link with persons who may vote for it. Voting results will be displayed automaticaly as soon as each person Vote for it.

## Application stack

### Backend
- [Node.js](https://nodejs.org/en/)
- [MongoDb](https://www.mongodb.com)
- [micro (http framework)](https://github.com/zeit/micro)
- [socket.io](https://socket.io)

### Frontend
- [React.js](https://reactjs.org)
- [Redux](https://redux.js.org)
- [socket.io-client](https://github.com/socketio/socket.io-client)

### Deployment
- [Now v1.0](https://zeit.co)

## Development
make sure local mongoDB is running
```
git clone https://github.com/mikhail-angelov/survey
npm i
npm start
```
to run client
```
cd client
npm i
npm start
```
local app will be avaliable on (http://localhost:8080/)[http://localhost:8080/]

## Test
```
npm test
```

## Deployment
- make sure you created an account on [https://zeit.co](https://zeit.co)
- create `now` secret to provide link to you MongoDB
`now secret add db-url mongodb+srv://<name>:<password>@<account>.mongodb.net/<db name>`
- run `npm run deploy`

## License
MIT
