/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.sendOrderEmail = functions.firestore
    .document("users/{userId}/orders/{orderId}")
    .onCreate(async (snap, context) => {
      const newOrder = snap.data();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ahmadgonabehero@gmail.com",
          pass: "toukaILY4eva",
        },
      });

      const mailOptions = {
        from: "ahmadgonabehero@gmail.com",
        to: "geegnebab@gmail.com",
        subject: "New Order Placed",
        text: `A new order has been placed. Order ID: ${newOrder.orderId}`,
      };

      return transporter.sendMail(mailOptions);
    });
