// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const pagarme = require("pagarme");

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.pagar = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.statusCode = 200;
    // res.json(req.body.card_hash);
    // Grab the text parameter.
    const api_key_test = "ak_test_czTtptNuS6s1GR5DjVlTKfynYvXSus";
    var amount = 47000;
    switch (req.body.installments) {
      case "1":
        var amount = 47000;
        break;
      case "2":
        var amount = 48880;
        break;
      case "3":
        var amount = 49820;
        break;
    }
    let transaction = {
      amount: amount,
      card_hash: req.body.CARD_HASH,
      card_expiration_date: req.body.card_expiration_date,
      card_holder_name: req.body.card_holder_name,
      installments: req.body.installments,
      customer: {
        external_id: req.body.customer.external_id,
        name: req.body.customer.name,
        type: "individual",
        country: "br",
        email: req.body.customer.email,
        documents: [
          {
            type: "cpf",
            number: req.body.customer.documents[0].number,
          },
        ],
        phone_numbers: req.body.customer.phone_numbers,
      },
      billing: {
        name: req.body.customer.name,
        address: {
          country: "br",
          state: req.body.billing.address.state,
          city: req.body.billing.address.city,
          neighborhood: req.body.billing.address.neighborhood,
          street: req.body.billing.address.street,
          street_number: req.body.billing.address.street_number,
          zipcode: req.body.billing.address.zipcode,
        },
      },
      items: [
        {
          id: req.body.installments,
          title: "Consulta Nutricional On-line #" + req.body.installments,
          unit_price: amount,
          quantity: 1,
          tangible: false,
        },
      ],
    };
    // campo de aniversário é opicional
    if (req.body.customer.birthday) {
      transaction.customer.birthday = req.body.customer.birthday;
    }
    if (req.body.billing.address.complementary) {
      transaction.billing.address.complementary =
        req.body.billing.address.complementary;
    }
    pagarme.client
      .connect({ api_key: api_key_test })
      .then((client) => {
        client.transactions
          .create(transaction)
          .then((transactions) => {
            // console.log(transactions);
            res.statusCode = 200;
            // res.setHeader("Content-Type", "text/plain");
            res.json({
              status: transactions.status,
            });
          })
          .catch((error) => {
            console.error("Rua: ", req.body.billing.address.street);
            res.json(error);
          });
      })
      .catch((error) => {
        // console.error("Ola mundo");
        // console.error(error);
        res.json(error);
      });
    // console.log(req.body);
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
