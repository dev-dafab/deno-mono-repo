FROM node:20-slim AS setup

COPY --from=denoland/deno:bin-2.1.1 /deno /usr/local/bin/deno
RUN npm install -g turbo
RUN npm install -g esbuild


FROM setup AS application
WORKDIR /app
COPY . .
RUN turbo prune @trics/api --docker

FROM application AS installer
WORKDIR /app
COPY --from=application /app/out/ .
RUN deno install
RUN turbo build --filter=@trics/api

FROM installer AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 api
RUN adduser --system --uid 1001 api
USER api
COPY --from=installer /app .

CMD ["node"]
