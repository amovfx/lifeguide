FROM node:latest

ARG UID=1001
ENV USER="me"
RUN useradd -u $UID -ms /bin/bash $USER

VOLUME ["/flask_data"]

