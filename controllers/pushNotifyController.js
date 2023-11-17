var admin = require("firebase-admin");
var serviceAccount = require("../test-ed54b-firebase-adminsdk-g58mh-881b29816e.json");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const token =
  "dUvET3sySayo7RqI4L-u0x:APA91bG1ABQku4FQnmPgQvYewlkucdF2U3ArnAodeZ8eyqe1M2LyvIHHR7PyFgC1P7nbQx5j1No5fouO8Mq-xIrRrUHwaEHQ5JfTNF4Y2PVcjdl00cqs_7xS8o8ibq-Bj-p9eiory7Cp";

const sendNotify = async (req, res) => {
  try {
    const { title, body, token } = req.body;

    const message = {
      notification: {
        title: title || "Default Title",
        body: body || "Default Body",
      },
      token: token,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        res.status(200).json({ success: true, response });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, error: error.message });
      });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, error: "Unexpected error" });
  }
};

module.exports = {
  sendNotify,
};

// admin
//   .messaging()
//   .send({
//     token: token,
//     data: {
//       customData: "LuuNguyen",
//       id: "1",
//       ad: "Yasin",
//     },
//     android: {
//       notification: {
//         title: title || "Hello",
//         body: body || "This is a test message",
//         priority: "high",
//         sound: "default",
//       },
//     },
//   })
