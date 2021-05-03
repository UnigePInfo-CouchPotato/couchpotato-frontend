FROM nginx:alpine

COPY ./dist/couchpotato-frontend /usr/share/nginx/html
COPY nginx.default /etc/nginx/conf.d/default.conf

EXPOSE 80