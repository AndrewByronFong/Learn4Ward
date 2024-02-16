const http = require("http");
const { app } = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//const { addPhoneme, addPhonemeVideo } = require("./lib/mongophoneme");


const server = http.createServer(app);

mongoose.connection.on("open", () => {
  console.log("Connected to database");
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
  mongoose
    .connect(
      "mongodb+srv://admin:learn4ward@learn4ward.bqec27o.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
    });
});

process.on("SIGINT", () => {
  mongoose.disconnect().then(() => {
    console.log(
      "Mongoose connection disconnected due to application termination"
    );
    process.exit(0);
  });
});
