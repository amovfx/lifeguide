# Use the Python3.7.2 image
FROM python:3.7.2-stretch


# Set the working directory to /app

# Copy the current directory contents into the container at /app
WORKDIR /app
ADD . /app



# Install the dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install uwsgi

# run the command to start uWSGI
CMD ["uwsgi", "app.ini"]