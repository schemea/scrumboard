FROM alpine as builder

WORKDIR /app
ENV NODE_ENV=production
COPY client/src src
COPY client/webpack.config.ts webpack.config.ts
RUN npm i
RUN npm run build

FROM alpine
WORKDIR server
COPY --from=builder /app/dist www
