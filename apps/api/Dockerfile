FROM node:20-alpine AS base

FROM base AS setup
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo
RUN npm install -g esbuild

FROM setup AS builder
WORKDIR /app
COPY . .

# prepare a subset of app
# only app and includes lib will be considered
RUN turbo prune @trics/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

RUN turbo build --filter=@trics/api

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 api
RUN adduser --system --uid 1001 api
USER api
COPY --from=installer /app .

CMD node apps/api/dist/index.js
