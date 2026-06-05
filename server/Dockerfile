FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install

COPY . .

EXPOSE 5000

ENTRYPOINT ["bash", "docker-entrypoint.sh"]
CMD ["node", "--watch", "server.js"]
