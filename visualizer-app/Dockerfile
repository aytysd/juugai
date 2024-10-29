FROM node:20-alpine

WORKDIR /app

# RUN apk add --no-cache apache2
COPY package*.json ./

RUN apk add --no-cache vim
RUN npm install

# EXPOSE 80

# COPY src ./src
# COPY public ./public
# COPY ./tsconfig.json .
# COPY ./next.config.ts .

CMD ["npm", "run", "dev1"]

# RUN httpd

# RUN rm /etc/apache2/httpd.conf
# COPY ./config/httpd.conf /etc/apache2/httpd.conf