FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

# npm run start:dev
CMD ["npm", "run", "start:dev"]