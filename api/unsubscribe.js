import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const email = req.query.email?.toLowerCase();
  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  const filePath = path.resolve("unsubscribed.csv");

  // Prevent duplicates
  const existing = fs.readFileSync(filePath, "utf8");
  if (existing.includes(email)) {
    return res
      .status(200)
      .send("You're already unsubscribed. Thank you!");
  }

  // Append to unsubscribed.csv
  fs.appendFileSync(filePath, `\n${email}`);
  return res
    .status(200)
    .send("You've been unsubscribed. We won’t contact you again.");
}
