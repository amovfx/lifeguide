FROM node:latest

RUN apt-get install -y build-essential python3.9 python3-pip python3.9-venv

ARG UID=1001
ENV USER="me"
RUN useradd -u $UID -ms /bin/bash $USER

VOLUME ["/flask_data"]

