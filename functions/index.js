// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const pagarme = require("pagarme");

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post("/pagamento", (req, res) => res.send(Widgets.create()));

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
// exports.pagar = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const api_key_test = "ak_test_czTtptNuS6s1GR5DjVlTKfynYvXSus";
//   pagarme.client
//     .connect({ api_key: api_key_test })
//     .then((client) => {
//       client.transactions
//         .create({
//           amount: 1000,
//           card_number: "4111111111111111",
//           card_holder_name: "abc",
//           card_expiration_date: "1225",
//           card_cvv: "123",
//         })
//         .then((transactions) => {
//           // console.log(transactions);
//           res.statusCode = 200;
//           // res.setHeader("Content-Type", "text/plain");
//           res.json({ status: transactions.status });
//         })
//         .catch((error) => {
//           // console.error("Ola mundo");
//           // console.error(error);
//           res.json(error);
//         });
//     })
//     .catch((error) => {
//       // console.error("Ola mundo");
//       // console.error(error);
//       res.json(error);
//     });
//   // console.log(req.body);
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
