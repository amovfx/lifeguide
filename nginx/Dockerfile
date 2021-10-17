# Use the Nginx image
FROM nethacker/ubuntu-18-04-nginx:latest

# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Replace with our own nginx.conf
COPY nginx.conf /etc/nginx/conf.d/

RUN apt-get update -y && apt-get install software-properties-common -y
#RUN add-apt-repository ppa:certbot/certbot -y
RUN apt-get update -y
RUN apt-get install python-certbot-nginx -y
RUN certbot --nginx
RUN certbot renew --dry-run

