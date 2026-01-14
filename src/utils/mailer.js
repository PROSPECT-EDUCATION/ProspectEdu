import nodemailer from "nodemailer";

export function makeTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP config missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env");
  }
  console.log("SMTP_USER =", process.env.SMTP_USER);
console.log("SMTP_PASS =", process.env.SMTP_PASS ? "SET" : "MISSING");
console.log("SMTP_HOST =", process.env.SMTP_HOST, "PORT =", process.env.SMTP_PORT);


  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendDoubtAnswerEmail({ to, name, doubtType, doubt, answer }) {
  const transporter = makeTransporter();

  const subject = `Response to your doubt (${doubtType})`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="color:#124734;">Hello ${name || "Student"},</h2>
      <p>We received your doubt and here is our response:</p>
      <div style="background:#F9FAFB;border:1px solid #e5e7eb;padding:12px;border-radius:10px;">
        <p><b>Doubt Type:</b> ${doubtType}</p>
        <p><b>Your Doubt:</b><br/> ${String(doubt || "").replace(/\n/g, "<br/>")}</p>
      </div>
      <div style="margin-top:12px;background:#E7F7E8;border:1px solid #a7e1b2;padding:12px;border-radius:10px;">
        <p><b>Answer:</b><br/> ${String(answer || "").replace(/\n/g, "<br/>")}</p>
      </div>
      <p style="margin-top:16px;color:#6b7280;">Prospect Education Team</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}
