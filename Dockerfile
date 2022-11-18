FROM node:16
RUN mkdir -p /home/app
COPY . home/app

RUN cd /home/app && npm install


EXPOSE 3000

CMD ["node", "home/app/dist/app.js"]