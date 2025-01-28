
# This is the Dockerfile reference for Angular SPA.
# 
# REQUIRED FILES TO BUILD THIS IMAGE
# ----------------------------------
# (1) nginx.conf file containing main Nginx configuration.
# (2) default.conf file containing default Nginx virtual host.
# (3) dist folder containing Angular application prepared for Production environment.

# Base Image
FROM docker-sd.faas.securitasdirect.local/nginx:1.13.9-alpine

# Copy source files
RUN mkdir mig-angular && mkdir mig-angular/health
COPY dist/ /mig-angular/app/

# Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/

# Deploying health checks into nginx
COPY nginx/health.json /mig-angular/health/ 

# User and permissions configuration
RUN addgroup verisure \
    && adduser -u 1000 -s /bin/sh -D -G verisure verisure \
    && mkdir /run/nginx \
    && chmod -R 777 /run/nginx \
    && chown verisure:verisure /run/nginx \
    && chmod -R 777 /usr/share \
    && chmod -R 777 /mig-angular \
    && chown -R verisure:verisure /mig-angular \
    && touch /var/run/nginx.pid \
    && chmod 777 /var/run/nginx.pid \
    && chmod -R 777 /var/cache/nginx \
    && chmod -R 777 /etc/nginx \
    && chown -R verisure:verisure /var/run/nginx.pid \
    && chown -R verisure:verisure /var/cache/nginx

USER verisure

# Inject enviroment vars
CMD /bin/sh -c "envsubst < /mig-angular/app/en/assets/env.template > /mig-angular/app/en/assets/env.js \
    && envsubst < /mig-angular/app/es/assets/env.template > /mig-angular/app/es/assets/env.js \ 
    && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf"
