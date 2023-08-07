FROM node
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN yarn
COPY . .
EXPOSE 5000
CMD ["yarn", "local"]