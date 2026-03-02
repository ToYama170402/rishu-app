FROM node:22-bullseye-slim as base

FROM base AS builder

WORKDIR /workspace

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY src ./src
COPY public ./public
COPY tsconfig.json app.config.ts ./

RUN pnpm build

FROM base AS runner

WORKDIR /workspace

USER node

COPY --from=builder /workspace/public ./public
COPY --from=builder --chown=node:node /workspace/.output ./.output
COPY --from=builder --chown=node:node /workspace/.vinxi ./.vinxi

CMD ["node", ".output/server/index.mjs"]