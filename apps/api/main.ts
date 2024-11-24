import app from './routes.ts';

import { swaggerUI } from '@hono/swagger-ui'

app.get(
  '/ui',
  swaggerUI({
    url: '/doc'
  })
)

app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0'
})

Deno.serve(app.fetch)
