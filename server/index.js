const micro = require('micro');
const { router, get, post, put } = require('microrouter');
const cors = require('micro-cors')({ allowMethods: ['GET', 'POST', 'PUT'] });
const handler = require('serve-handler');
const io = require('socket.io')
const sockets = require('./sockets.js')

const route = cors(
  router(
    get('/survey', async (req, res) => {
      try {
        micro.send(res, 200, { status: 'ok' });
      } catch (e) {
        console.error('get chats error: ', e)
        micro.send(res, 400, { error: 'get survey error' })
      }
    }),
    get('/survey/:surveyId', async (req, res) => {
      try {
        micro.send(res, 200, { status: req.params.surveyId });
      } catch (e) {
        console.error('get chats error: ', e)
        micro.send(res, 400, { error: 'get survey error' })
      }
    }),
    post('/survey', async (req, res) => {
      try {
        micro.send(res, 200, { status: 'new' });
      } catch (e) {
        console.error('create chat error: ', e)
        micro.send(res, 400, { error: 'create survey error' })
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
      return await handler(req, res, {
        "public": __dirname + '/../client/build'
      })
    }
  }
)


sockets(io(server))

server.listen(4000, () => console.log('Listening on localhost:4000'))
