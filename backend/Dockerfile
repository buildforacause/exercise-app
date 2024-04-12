# Use the official Python 3.10 image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# env file
COPY .env /app/.env
  
# Copy the rest of the backend files
COPY . /app/

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["waitress-serve", "--listen=*:5000", "wsgi:app"]
