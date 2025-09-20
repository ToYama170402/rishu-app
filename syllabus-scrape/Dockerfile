FROM node:20-bullseye-slim AS base

# Chromeと必要なフォント・ライブラリをインストール
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y \
  google-chrome-stable \
  fonts-ipafont-gothic \
  fonts-wqy-zenhei \
  fonts-thai-tlwg \
  fonts-kacst \
  fonts-freefont-ttf \
  libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN mkdir -p /workspace/syllabus-scrape/node_modules && \
  chown -R node:node /workspace && \
  npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY src ./src
COPY tsconfig.json *.mjs ./

RUN  pnpm build

FROM base AS runner

WORKDIR /workspace

USER node

COPY --from=builder /workspace/dist ./dist


CMD ["node", "./dist/main.js"]