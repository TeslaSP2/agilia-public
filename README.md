# INSTALACIÓN
Para poder ejecutar el proyecto primero debes instalar las dependencias mediante `npm i`, para justo después iniciar el proyecto mediante `npm run start`

# CONFIGURACIÓN
En la carpeta `env` existe un archivo con las variables del programa entre ellas:
* **JWT_SECRET**: El secreto utilizado para encriptar el JWT
* **MONGO_STRING**: La cadena de conexión para MongoDB
* **DATABASE_NAME**: El nombre de la base de datos de MongoDB

# DOCUMENTACIÓN
Al iniciar el proyecto puedes acceder a su documentación [aquí](https://localhost:3000/doc)

# PREGUNTAS
## ¿Es necesario crear un endpoint logout?
En este proyecto estoy usando un JWT con un máximo de tiempo de 60 segundos, así que el usuario debería logearse de nuevo después de ese tiempo para poder acceder de nuevo al resto de endpoints, por tanto en este caso no he necesitado un endpoint de logout, pero en otros casos en los que el token tenga un tiempo más amplio o directamente no tenga, sería conveniente crear ese endpoint

## La funcionalidad “Dar de baja” se puede hacer de varias formas, explica al menos 3 formas que se podría hacer.
La manera más rápida y sencilla es la de eliminar por completo al usuario de la base de datos, el mayor inconveniente de esto es que no se podrían restaurar los datos en el caso de un borrado erróneo o reactivación del usuario

Otras dos maneras es mediante el añadido de un valor para indicar si el usuario está activo o no, o añadir un nuevo rol que difiera de Admin o User en el que restringiría el acceso a toda la API. En estos dos casos la ventaja es que se mantiene el usuario en el caso de un borrado erróneo.