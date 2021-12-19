# Use the Python3.7.2 image
FROM python:3.9-slim-bullseye
RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*
#RUN apt install python-dev clang libffi libffi-dev
# Set the working directory to /app

# Copy the current directory menu_manager into the container at /app
WORKDIR /app
ADD . /app

# Install the dependencies
#RUN conda install libpython m2w64-toolchain -c msys2
RUN python -m pip install --upgrade pip
RUN pip3 install -r requirements.txt
RUN pip3 install uwsgi

# run the command to start uWSGI
CMD ["uwsgi", "app.ini"]