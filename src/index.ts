import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { isSupported } from "google-translate-api-browser";
import Translator from "./translator";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;
const corsOptions: CorsOptions = {
  origin: ["*"],
};

app.use(cors());
app.use(express.json());
app.post("/", async (req, res) => {
  const body = req.body;

  const from = body.from;
  const to = body.to;
  const text = body.text;

  if (!isSupported(from)) {
    res.status(400);
    res.send("from language not supported");
  }

  if (!isSupported(to)) {
    res.status(400);
    res.send("to language not supported");
  }

  try {
    const translateResult = await Translator(from, to, text);
    res.send(translateResult);
  } catch (e) {
    res.status(500);
    console.log(e);

    res.send("Failed to translate");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
