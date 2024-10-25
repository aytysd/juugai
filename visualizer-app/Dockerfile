FROM node:20-alpine

WORKDIR /app

# RUN apk add --no-cache apache2
COPY package*.json ./

RUN apk add --no-cache vim
RUN npm install

# EXPOSE 80


# RUN httpd

# RUN rm /etc/apache2/httpd.conf
# COPY ./config/httpd.conf /etc/apache2/httpd.conf