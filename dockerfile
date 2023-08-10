FROM node
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN yarn
COPY . .
EXPOSE 5000
CMD ["yarn", "local"]
HEALTHCHECK --interval=20s --timeout=10s --start-period=5s --retries=2 CMD curl -f http://localhost:5000/notes/ping || exit 1