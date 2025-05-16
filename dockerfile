# indicamos la imagen base del proyecto
FROM node

# establecemos el nombre de la app / directorio de trabajo
WORKDIR /coderBack3

# copiamos los archivos de la aplicación al contenedor
COPY package.json ./
RUN npm install
COPY . .

# exponemos el puerto de la aplicacion
EXPOSE 8080

# definimos el comando para ejecutar la app
CMD ["npm", "start"]