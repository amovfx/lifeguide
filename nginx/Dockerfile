# Use the Nginx image
FROM nginx:latest

# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Replace with our own nginx.conf
COPY ${NGINX_CONF_FILE} /etc/nginx/conf.d


