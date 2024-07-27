# Usar una imagen base de Node.js
FROM node:18

# Crear un directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el archivo de dependencias y el lockfile
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que la API escuchará
EXPOSE 3000