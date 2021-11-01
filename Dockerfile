FROM node:14-alpine
MAINTAINER minho <minhob38@gmail.com>
LABEL purpose=study
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start

# docker build -t my-server-image:latest .
# expose는 단순히 documentaion