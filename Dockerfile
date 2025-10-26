FROM mcr.microsoft.com/playwright:v1.45.0-jammy AS builder
RUN apt-get update \
    && apt-get install -y openjdk-17-jre-headless \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g allure-commandline
EXPOSE 3000
CMD npx playwright test && allure generate allure-results --clean -o allure-report && allure open -p 3000 allure-report
