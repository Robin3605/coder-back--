# indicamos la imagen base del proyecto
FROM node:18-alpine

# establecemos el nombre de la app / directorio de trabajo
WORKDIR /coderback3

# Instala dependencias de compilación para bcrypt
RUN apk add --no-cache python3 make g++

# copiamos los archivos de la aplicación al contenedor
COPY package.json ./
RUN npm install 

RUN npm rebuild bcrypt

COPY . .

# exponemos el puerto de la aplicacion
EXPOSE 8080

# definimos el comando para ejecutar la app
CMD ["npm", "start"]