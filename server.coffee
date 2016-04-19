fs      = require 'fs'
path    = require 'path'
express = require 'express'
proxy   = require 'express-http-proxy'

app = express()

vault_addr  = process.env.VAULT_ADDR
vault_token = process.env.VAULT_TOKEN

app.set 'port', process.env.PORT or 3000

app.use '/', express.static(path.join(__dirname, 'public'))

# Additional middleware which will set headers that we need on each request.
app.use (req, res, next) ->
  # Simple logging of all requests
  console.log '%s %s %s', req.method, req.url, req.path

  # Set permissive CORS header - this allows this server to be used only as
  # an API server in conjunction with something like webpack-dev-server.
  res.setHeader 'Access-Control-Allow-Origin', '*'

  # Disable caching so we'll always get the latest comments.
  res.setHeader 'Cache-Control', 'no-cache'

  next()
  return

app.use '/v1/secret', proxy(vault_addr,
  forwardPath: (req, res) ->
    require('url').parse(req.originalUrl).path

  decorateRequest: (req) ->
    req.headers['Content-Type'] = 'application/json'
    req.headers['X-Vault-Token'] = vault_token
    req
)

app.listen app.get('port'), ->
  console.log "Server started: http://localhost:#{app.get('port')}/"
  return
