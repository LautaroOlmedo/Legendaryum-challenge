DOCUMENTACIÓN:

COMANDOS:
- sudo docker-compose up -d redis 
- npm run start:dev 
- inicia el servidor

-----
ARQUITECTURA:

Domain (DOMINIO):
Entidades básicas y repositorios a implementar por los distintos servicios de bases de datos, en este caso, Redis.

Application (LÓGICA Y CASOS DE USO): 
Servicios que satisfacen las necesidades del dominio.

Infrastructure (INFRAESTRUCTURA):
Capa de acomplamiento. Es en esta capa donde encontramos las implementaciones de la base de datos, Frameworks, etc.. También contiene la configuración básica del servidor (config.ts, load-env-vars.ts) y las dependecias.

-----

metaverseRoomService: Servicio que, a través de inyección de dependencia hace uso de coinService y roomService. Decidí crear este servicio (metaverseRoomService) para que en la capa de infraestructura, más precisamente socket/socket.server no se hagan llamados múltiples servicios y solo utilice uno (metaverseRoomService) que funciona como orquestador entre coinService y roomService

metaverseRoom recibe por DTO "roomName, roomArea, coinQuantity" las cuales hacen referencia a:
  -  roomName: nombre de la sala.
  -  coinQuantity: CANTIDAD de monedas a generarse.
  - roomArea: Decidí trabajar roomArea como los límites del "eje de coordenas". Esto quiere decir que las coins se van a generar en lugares aleatorios que se encuentren DENTRO de los límites de x, y, z, en otras palabras, cada coin tiene coordenadas en el plano (x, y, z) válido para esa room. Además debo destacar que roomArea NO pertenece a la entidad room, si lo trabajaba como tal (atributos pertenecientes a room) iba a tener un constante acoplamiento entre roomService y coinService.

-----

REDIS: Dentro de la carpeta database se encuentra redis/redis.ts, este, es el cliente que se conecta con redis al levantar el contenedor 
- connectIfNecessary(): Realiza una conexión con redis. 
- isHealthy(): Checkea si la conexión se encuentra activa, si no, se intenta conectar.

