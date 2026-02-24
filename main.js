import axios from "axios";
import pkg from "pg";

const { Client } = pkg;

const BASE_URL = "";
const EMAIL = "tomignacio2022@gmail.com";

async function runChallenge() {

  console.log("init");

  // ===== STEP 1 — GET =====
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

  /*
  
  const dbConfig = {
    host: data.db.host,
    user: data.db.user,
    password: data.db.password,
    database: data.db.database,
    port: data.db.port,
    ssl: { rejectUnauthorized: false }
  };

  const sqlQuery = data.sqlQuery;

  // ===== STEP 2 — DB CONNECTION =====
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
    answer = Number(Object.values(result.rows[0])[0]);
    console.log("Answer:", answer);
  } catch (err) {
    console.error("Error ejecutando query:", err.message);
    await client.end();
    return;
  }

  await client.end();

  // ===== STEP 4 — POST =====
  try {
    const submitResponse = await axios.post(
      BASE_URL + "/api/candidate/submit-second-challenge",
      {
        applicationId,
        pastebinUrl: "https://pastebin.com/TU_LINK",
        answer
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("POST status:", submitResponse.status);
    console.log("Respuesta:", submitResponse.data);

  } catch (err) {
    console.error("Error en POST:", err.response?.data || err.message);
  }

  */
}

runChallenge();