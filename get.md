GET status: 200
GET data: {
  applicationId: '77877456005',
  dbCredentials: {
    username: '',
    password: '',
    database: 'postgres',
    host: '',
    port: ,
    sslMode: 'required'
  },
  challengeDescription: '⚠️ ATENCIÓN: Tenés 30 minutos desde AHORA para completar este challenge. Si se te acaba el tiempo, no vas a poder enviar tu respuesta.\n' +
    '\n' +
    '--- INSTRUCCIONES ---\n' +
    '\n' +
    '1. Conectate a la base de datos usando las credenciales incluidas en esta respuesta (campo "dbCredentials").\n' +
    '\n' +
    '2. Vas a encontrar dos tablas:\n' +
    '   - "applicationid_merchant": tabla pivote que asocia tu applicationId con un merchantid.\n' +
    '   - "transactions": contiene las transacciones asociadas a cada merchantid.\n' +
    '\n' +
    '3. Usando tu applicationId (incluido en esta respuesta), encontrá tu merchantid en la tabla pivote y luego tus transacciones.\n' +
    '\n' +
    '4. Escribí una consulta SQL que obtenga: el monto máximo (amount) entre todas TUS transacciones cuya descripción (description) comience con la letra "M".\n' +
    '\n' +
    '5. Creá una cuenta en Pastebin (https://pastebin.com) y subí tu consulta SQL. La URL de la página de tu consulta debe ser incluida en el campo "pastebinUrl".\n' +
    '\n' +
    '6. Enviá un POST a /api/candidate/submit-second-challenge con el siguiente JSON:\n' +
    '   {\n' +
    '     "applicationId": "tu applicationId (incluido en esta respuesta)",\n' +
    '     "pastebinUrl": "https://pastebin.com/tu-paste",\n' +
    '     "answer": <el número que obtuviste>\n' +
    '   }\n' +
    '\n' +
    '¡Éxitos!'
}