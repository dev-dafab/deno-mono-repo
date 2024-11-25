import { z, createRoute, OpenAPIHono } from "zod-openapi";
import { AppContext } from "../../../context.ts";
import { sayHello } from "@trics/sayHello";


const app = new OpenAPIHono<AppContext>();

const route = createRoute({
  method: "get",
  path: "/",
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z
            .object({ greeting: z.string().openapi({example: "World"}) })
            .openapi("GreetingDto"),
        },
      },
      description: "Returns an greetings",
    },
  },
});

app.openapi(route, c => {
  return c.json(sayHello());
});

export default app;
