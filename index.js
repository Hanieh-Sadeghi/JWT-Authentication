const express = require("express");
const app = express();

const auth = require("./routes/auth");
const post = require("./routes/post");


app.use("/auth", auth);
app.use("/posts", auth.post);


app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(5000, () => {
  console.log("NOw running on port 5000");
});
