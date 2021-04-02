/*
  dependencies
*/
const { response } = require("express");
const express = require("express");
const admin = require("firebase-admin");
const inspect = require("util").inspect;
const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const UUID = require("uuid-v4");

/* 
  config - express
*/
const app = express();
const port = process.env.PORT || 3000;

/*
  config - firebase
*/
const serviceaccount = require("./secretKeyFile.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceaccount),
  storageBucket: "vuegram-c5a76.appspot.com",
});
const db = admin.firestore();
const bucket = admin.storage().bucket();
/*
  endpoint
*/

app.get("/posts", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let posts = [];
  const snapshot = db
    .collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  var busboy = new Busboy({ headers: request.headers });

  let fields = {};
  let fileData = {};
  let uuid = UUID();

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );
    file.on("data", function (data) {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    });
    file.on("end", function () {
      console.log("File [" + fieldname + "] Finished");
    });

    filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimetype };
  });
  busboy.on(
    "field",
    function (
      fieldname,
      val,
      fieldnameTruncated,
      valTruncated,
      encoding,
      mimetype
    ) {
      console.log("Field [" + fieldname + "]: value: " + inspect(val));
      fields[fieldname] = val;
    }
  );
  busboy.on("finish", function () {
    console.log(fields);
    bucket.upload(
      fileData.filepath,
      {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimetype,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile);
        }
      }
    );

    function createDocument(uploadedFile) {
      db.collection("posts")
        .doc(fields.id)
        .set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
        })
        .then(() => {
          response.send("Post added: " + fields.id);
        });
    }
    console.log("Done parsing form!");
    // response.writeHead(303, { Connection: "close", Location: "/" });
  });
  request.pipe(busboy);
});

/*
  listen
*/
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
