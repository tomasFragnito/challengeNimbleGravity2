Challenge NimbleGravity — Segunda Parte

Este script realiza el segundo challenge de NimbleGravity:
Hace un GET al endpoint del challenge para recibir applicationId y credenciales de PostgreSQL.

Se conecta a la base de datos remota usando las credenciales SSL.
(se utilizo DBeaver para testear la conexion y visializar la tablas)

Ejecuta una query SQL para obtener el monto máximo ( con -> MAX(amount) ) de las transacciones
las cuales sus "description" empiezan con "M", filtrando solo las asociadas al applicationId.

Sube la query a Pastebin y envia un POST al endpoint con:
- applicationId
- URL de Pastebin
- answer

Dependencias:
- axios
- pg
- dotenv

Uso:
- desde la terminal ejecutar -> npm run start

IMPORTANTE!!
Se debe crear el archivo .env con sus respectivas variables de entorno
variables:
    BASE_URL: (url del endpoint)
    EMAIL: (mail del user)

