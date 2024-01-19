import app from "./app.js";
import mongoose from "mongoose";
import 'dotenv/config'

const port = 3000;

const user = "yourUsername";
const password = "yourPassword";

mongoose.connect(
  `mongodb+srv://${process.env.user}:${process.env.password}@musikcluster.3mqaheo.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
