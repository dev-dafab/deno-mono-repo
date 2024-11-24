import { z, createRoute, OpenAPIHono } from 'zod-openapi'
import { AppContext } from '../../../context.ts'
import {sayHello} from "npm:@trics/sayHello"


const app = new OpenAPIHono<AppContext>()

const route = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({greet: z.string().openapi('greet')}).openapi('GreetingDto'),
        },
      },
      description: 'Returns an greetings',
    },
  },
})

app.openapi(route, (c) => {
  return c.json({greet: 'Hello World'})
})


export default app;
