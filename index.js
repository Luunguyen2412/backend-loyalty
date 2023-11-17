const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
// var admin = require("firebase-admin");
// var serviceAccount = require("./test-ed54b-firebase-adminsdk-g58mh-881b29816e.json");

connectDb();

const app = express();

const port = process.env.PORT || 5000;
// process.env.GOOGLE_APPLICATION_CREDENTIALS;

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const token =
//   "dUvET3sySayo7RqI4L-u0x:APA91bG1ABQku4FQnmPgQvYewlkucdF2U3ArnAodeZ8eyqe1M2LyvIHHR7PyFgC1P7nbQx5j1No5fouO8Mq-xIrRrUHwaEHQ5JfTNF4Y2PVcjdl00cqs_7xS8o8ibq-Bj-p9eiory7Cp";

// const message = {
//   notification: {
//     title: "Hello",
//     body: "This is a test message",
//   },
//   token: token,
// };

// // Send the message to the device
// admin
//   .messaging()
//   .send(message)
//   .then((response) => {
//     console.log("Successfully sent message:", response);
//   })
//   .catch((error) => {
//     console.error("Error sending message:", error);
//   });

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/bills", require("./routes/billHistoryRoutes"));
app.use("/api/send", require("./routes/sendNotifyRoutes"));

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE, PATCH",
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
