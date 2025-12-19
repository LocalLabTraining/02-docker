FROM nginx:stable-alpine

COPY default.conf.template /etc/nginx/templates/default.conf.template

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html

EXPOSE 80