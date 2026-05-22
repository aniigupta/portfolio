const fs = require('fs');
const nodemailer = require('nodemailer');

const envPath = './.env.local';
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local not found in current directory!");
  process.exit(1);
}

const envConfig = fs.readFileSync(envPath, 'utf-8');
const env = {};
envConfig.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

async function main() {
  console.log("SMTP_HOST:", env.SMTP_HOST);
  console.log("SMTP_PORT:", env.SMTP_PORT);
  console.log("SMTP_USER:", env.SMTP_USER);
  console.log("SMTP_PASS:", env.SMTP_PASS ? "********" : "undefined");

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: env.SMTP_SECURE === 'true',
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  try {
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("Transporter verification SUCCESSful!");
  } catch (error) {
    console.error("Transporter verification FAILED:", error);
  }
}

main();
