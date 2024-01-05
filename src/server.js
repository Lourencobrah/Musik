import app from "./app.js";
import mongoose from "mongoose";

const port = 3000;

const user = "yourUsername";
const password = "yourPassword";

mongoose.connect(
  `mongodb+srv://${user}:${password}@musikcluster.3mqaheo.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
