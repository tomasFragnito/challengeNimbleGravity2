import axios from "axios";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;
const BASE_URL = process.env.BASE_URL;
const EMAIL = process.env.EMAIL;

console.log("BASE_URL:", BASE_URL);
console.log("EMAIL:", EMAIL);


//Funcion principal
async function runChallenge() {
    try {
        const data = await getChallengeInfo();
        const client = await connectDB(data.dbCredentials);
        const answer = await executeQuery(client, data.applicationId);

        // URL de Pastebin
        const pastebinUrl = "https://pastebin.com/nFGMutjJ";

        await submitAnswer(data.applicationId, pastebinUrl, answer);

    } catch (err) {
        console.error("Error:", err.message);
    }
}

//Paso 1
//GET cual devuelve un objeto con applicationId y credenciales + info consigna
async function getChallengeInfo() {
    try {
        const response = await axios.get(BASE_URL+"/api/candidate/get-second-challenge",  // Se obtiene applicationId y credenciales de PostgreSQL desde el endpoint (GET)
        {
            params: { email: EMAIL }
        });

        console.log("GET status:", response.status);
        console.log("GET data:", response.data);

        return response.data;
    } catch (err) {
        console.error("Error en GET:", err.response?.data || err.message);
        throw err;
    }
}

//Paso 2
//conecta la base de datos PostgreSQL y devuelve el cliente conectado
async function connectDB(dbCredentials) { // Credenciales para conectarse a postgreSQL
    const dbConfig = {
        host: dbCredentials.host,
        user: dbCredentials.username,
        password: dbCredentials.password,
        database: dbCredentials.database,
        port: dbCredentials.port,
        ssl: { rejectUnauthorized: false } // SSL required
    };

    const client = new Client(dbConfig);
    try {
        await client.connect();
        console.log("Connected DB");
        return client;
    } catch (err) {
        console.error("Error conectando DB:", err.message);
        throw err;
    }
}

//Paso 3
//Devuelve el valor numerico maximo
async function executeQuery(client, applicationId) {
    const sqlQuery = `
        SELECT MAX(t.amount) AS max_amount
        FROM transactions t
        JOIN applicationid_merchant am
        ON t.merchantid = am.merchantid
        WHERE am.applicationid = '${applicationId}'
        AND t.description LIKE 'M%';
    `;

    try {
        const result = await client.query(sqlQuery);
        const answer = Number(result.rows[0].max_amount); // se extrae el valor numrrico

        console.log("Answer:", answer);
        return answer;
    } catch (err) {
        console.error("Error ejecutando query:", err.message);
        throw err;
    }

    await client.end(); // cierra la conexion a la base de datos

}

//Paso 4 Enviar respuesta (POST)
async function submitAnswer(applicationId, pastebinUrl, answer) {
  try {
        const submitResponse = await axios.post( BASE_URL+"/api/candidate/submit-second-challenge",
        { applicationId, pastebinUrl, answer },
        { headers: { "Content-Type": "application/json" } }
        );

        console.log("POST status:", submitResponse.status);
        console.log("Respuesta:", submitResponse.data);
    } catch (err) {
        console.error("Error en POST:", err.response?.data || err.message);
        throw err;
    }
}

runChallenge();