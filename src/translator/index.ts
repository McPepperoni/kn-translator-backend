import axios from "axios";
import {
  generateRequestUrl,
  normaliseResponse,
} from "google-translate-api-browser";
import { LangKey } from "google-translate-api-browser/dist/languages";

export default async function Translator(
  from: LangKey,
  to: LangKey,
  text: string
) {
  const url = generateRequestUrl(text, { from, to });

  try {
    const res = await axios.get(url);

    return normaliseResponse(JSON.parse(JSON.stringify(res.data)));
  } catch (error) {
    throw error;
  }
}
