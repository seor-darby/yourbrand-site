import { getRequestConfig } from "next-intl/server";
import { readFile } from "fs/promises";
import path from "path";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "ko";
  const filePath = path.join(process.cwd(), "messages", `${locale}.json`);
  const messages = JSON.parse(await readFile(filePath, "utf-8"));
  return { locale, messages };
});