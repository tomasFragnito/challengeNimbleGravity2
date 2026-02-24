import axios from "axios";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const BASE_URL = process.env.BASE_URL;
const EMAIL = process.env.EMAIL;

console.log("BASE_URL:", BASE_URL);
console.log("EMAIL:", EMAIL);

async function runChallenge() {

  console.log("init");

  // ===== paso 1 GET =====

  // Se obtiene applicationId y credenciales de PostgreSQL desde el endpoint (GET)
  let data;
  try {
    const response = await axios.get(
      BASE_URL + "/api/candidate/get-second-challenge",
      { params: { email: EMAIL } }
    );

    console.log("GET status:", response.status);
    console.log("GET data:", response.data);

    data = response.data;

  } catch (err) {
    console.error("Error en GET:", err.response?.data || err.message);
    return;
  }

  const applicationId = data.applicationId;
  const db = data.dbCredentials; // Credenciales para conectarse a postgreSQL

  // ===== DB CONFIG =====
  const dbConfig = {
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database,
    port: db.port,
    // SSL required
    ssl: { rejectUnauthorized: false }
  };

  // ===== SQL QUERY =====
  // obtiene el monto maximo entre todas las transacciones con description que empieza con "M"
  const sqlQuery = `
    SELECT MAX(t.amount) AS max_amount
    FROM transactions t
    JOIN applicationid_merchant am
      ON t.merchantid = am.merchantid
    WHERE am.applicationid = '${applicationId}'
      AND t.description LIKE 'M%';
  `;

  // ===== paso 2 DB CONNECTION =====
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log("Connected DB");
  } catch (err) {
    console.error("Error conectando DB:", err.message);
    return;
  }

  // ===== STEP 3 — QUERY =====
  let answer;
  try {
    const result = await client.query(sqlQuery);

    answer = Number(result.rows[0].max_amount); // se extrae el valor numrrico

    console.log("Answer:", answer);
  } catch (err) {
    console.error("Error ejecutando query:", err.message);
    await client.end();
    return;
  }

// cierra la conexion a la base de datos
  await client.end();

// URL de Pastebin
  const pastebinUrl = "https://pastebin.com/nFGMutjJ";

  // ===== STEP 4 — POST =====
  try {
    const submitResponse = await axios.post(
      BASE_URL + "/api/candidate/submit-second-challenge",
      {
        applicationId,
        pastebinUrl,
        answer
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("POST status:", submitResponse.status);
    console.log("Respuesta:", submitResponse.data);

  } catch (err) {
    console.error("Error en POST:", err.response?.data || err.message);
  }

}

runChallenge();