# Use the Python3.7.2 image
FROM python:3.9-slim-bullseye
RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*
#RUN apt install python-dev clang libffi libffi-dev
# Set the working directory to /app_factory

# Copy the current directory menu_manager into the container at /app_factory

COPY ./requirements.txt /requirements.txt

VOLUME ["/flask_data"]


# Install the dependencies
#RUN conda install libpython m2w64-toolchain -c msys2
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
RUN pip3 install uwsgi

WORKDIR /flask_data

