import { OpenAPIHono } from 'zod-openapi'
import helloWorldRoute  from './src/features/hello_world/index.ts';
import { AppContext } from './context.ts'

const app = new OpenAPIHono<AppContext>()

const apiRoutes = app.route('/hello', helloWorldRoute)


export type ApiRoutes = typeof apiRoutes
export default app;
