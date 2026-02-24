    1. Tenés 30 minutos desde que iniciás el challenge para completar todos los pasos.

    El timer arranca cuando hacés el primer GET al endpoint de inicio. Si se acaba el tiempo, no vas a poder enviar tu respuesta.

    2. Necesitás tener instalado un gestor de base datos Postgres.

    Podes usar TablePlus, DBeaver, Datagrip, etc.

    3. Al momento de contectarte a la DB, setear SSL Mode: Required.

    De lo contrario no podras contectarte a la base.

    4. Deadline: Viernes 27/2 3PM (Hora Argentina).

BASE_URL

https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net

Pasos
Step 1 — Iniciar el challenge

Hacé una llamada GET pasando tu email como parámetro:

GET {BASE_URL}/api/candidate/get-second-challenge?email=TU_EMAIL

La respuesta incluye tu applicationId, las credenciales de conexión a la base de datos y las instrucciones del challenge. Leé con atención la respuesta.
Step 2 — Resolver el challenge

Seguí las instrucciones que recibiste en el Step 1.
Step 3 — Enviar la respuesta

Hacé un POST con tu respuesta:

POST {BASE_URL}/api/candidate/submit-second-challenge
Content-Type: application/json

Body:

{
  "applicationId": "tu-application-id",
  "pastebinUrl": "https://pastebin.com/xxxxxxxx",
  "answer": 12345
}

Campo 	Tipo 	Descripción
applicationId 	string 	El applicationId que recibiste en el Step 1
pastebinUrl 	string 	URL de tu consulta SQL subida a Pastebin
answer 	number 	El resultado numérico obtenido de tu consulta

Respuesta exitosa (200):

{ "ok": true }

Posibles errores
Status 	Significado
404 	No se encontró un candidato con ese applicationId
403 	No completaste el primer challenge
400 	Tenés que hacer el GET del Step 1 primero
409 	Ya enviaste tu respuesta
410 	Se te acabó el tiempo (30 minutos)
400 	Tu respuesta no es correcta
Preguntas frecuentes

    Recibieron mi challenge? Una vez recibaste la respuesta "ok: true" por parte del servidor, ya podés dar por finalizado el challenge de forma correcta.

    Puedo llamar multiples veces al endpoint? Si, mientras estés dentro del rango de minutos permitido.

    Cuanto tendré novevades? Se enviará un correo en las próximas semanas una vez se hayan evaluado todos los challenges, para seguir con el proceso de selección, en caso de continuar.
