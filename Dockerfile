# 1. Etapa de construcción
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Etapa de producción
FROM nginx:stable-alpine

# Copiamos los archivos generados por Vite (dist) a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# ESTA ES LA PARTE CLAVE: Configuramos Nginx para que use el puerto de Railway
# y para que no dé error 404 al refrescar rutas de React.
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Railway inyecta el puerto 80 por defecto si no dices nada, 
# pero Nginx DEBE estar escuchando en el 80 dentro del contenedor.
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]