import app, {ApiRoutes} from '../routes.ts';
import { testClient } from 'hono/testing';
import { assertEquals } from 'assert'


Deno.test('Hello World', async () => {
  const res = await testClient<ApiRoutes>(app, {}).hello.$get();
  assertEquals(res.status, 200)
})
