# ETAPA 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos los archivos de dependencias primero para que sea más rápido
COPY . .
RUN npm install

# Copiamos el resto del código y generamos la carpeta 'dist'
COPY . .
RUN npm run build

# ETAPA 2: Servidor de producción (Nginx)
FROM nginx:stable-alpine

# Copiamos los archivos compilados desde la etapa 'build'
# Importante: Vite guarda todo en la carpeta 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (puerto estándar web)
EXPOSE 80

CMD ["/bin/sh", "-c", "sed -i 's/listen  80;/listen '\"$PORT\"';/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]