# Build stage
FROM node:18-alpine AS build
WORKDIR /app

COPY .npmrc package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

COPY . .
RUN npm run build

# Run stage (nginx serves static build)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# optional: SPA routing support
RUN rm /etc/nginx/conf.d/default.conf
RUN printf "server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files \$uri /index.html;\n\
  }\n\
}\n" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]