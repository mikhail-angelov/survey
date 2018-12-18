const micro = require('micro');
const { router, get, post, put } = require('microrouter');
const cors = require('micro-cors')({ allowMethods: ['GET', 'POST', 'PUT'] });
const handler = require('serve-handler');
const io = require('socket.io')
const sockets = require('./sockets.js')
const survey = require('./survey')

const route = cors(
  router(
    get('/survey-list/:ownerId', async (req, res) => {
      try {
        const result = await survey.list(req.params.ownerId)
        micro.send(res, 200, result)
      } catch (e) {
        console.error('get survey-list error: ', e)
        micro.send(res, 400, { error: 'get survey-list error' })
      }
    }),
    get('/survey/:surveyId', async (req, res) => {
      try {
        const result = await survey.get(req.params.surveyId)
        micro.send(res, 200, result)
      } catch (e) {
        console.error('get survey error: ', e)
        micro.send(res, 400, { error: 'get survey error' })
      }
    }),
    post('/survey', async (req, res) => {
      try {
        const body = await micro.json(req)
        const result = await survey.create(body)
        micro.send(res, 200, result)
      } catch (e) {
        console.error('create survey error: ', e)
        micro.send(res, 400, { error: 'create survey error' })
      }
    }),
    post('/survey-vote', async (req, res) => {
      try {
        const body = await micro.json(req)
        const result = await survey.vote(body)
        micro.send(res, 200, result)
      } catch (e) {
        console.error('vote error: ', e)
        micro.send(res, 400, { error: 'voteerror' })
      }
    }),
    post('/survey-close', async (req, res) => {
      try {
        const body = await micro.json(req)
        const result = await survey.close(body)
        micro.send(res, 200, result)
      } catch (e) {
        console.error('survey-close error: ', e)
        micro.send(res, 400, { error: 'survey-close error' })
      }
    }),
  )
)

const server = micro(
  async (req, res) => {
    const api = await route(req, res)
    if (res.finished) {
      return api
    } else {
      // redirect all un processed urls to UI
      return await handler(req, res, {
        "public": __dirname + '/../client/build'
      })
    }
  }
)


sockets(io(server))

server.listen(4000, () => console.log('Listening on localhost:4000'))
