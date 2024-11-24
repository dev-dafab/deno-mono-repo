FROM node:20-slim AS setup

COPY --from=denoland/deno:bin-2.1.1 /deno /usr/local/bin/deno
RUN npm install -g turbo
RUN npm install -g esbuild


FROM setup AS installer
WORKDIR /app
COPY . .
RUN deno install

CMD ["node"]
