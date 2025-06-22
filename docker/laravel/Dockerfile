FROM laravelsail/php82-composer:latest

# Install Imagick
RUN apt-get update && \
    apt-get install -y libmagickwand-dev imagemagick && \
    pecl install imagick && \
    docker-php-ext-enable imagick

# Install Node.js tools (for React & Vite)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm && npm install -g pnpm

WORKDIR /var/www/html
