import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'madaanvansh68@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'goowkbvlnndtivdv',
  }
});
export const sendCampaignEmail = async (to, subject, html) => {
  try {
    if (typeof to !== 'string') {
      throw new Error(`Invalid email address. Expected string but got ${typeof to}`);
    }
    to = to.trim().replace(/^['"]+|['"]+$/g, '');

    const finalHtml = `
      ${html}
      <hr/>
      <p>Hello! This is an extra message from your company.</p>
    `;

    const textFallback = finalHtml.replace(/<[^>]+>/g, '');
console.log("Sending to:", to);
console.log("Subject:", subject);
console.log("HTML:", html);

    await transporter.sendMail({
      from: 'madaanvansh68@gmail.com',
      to,
      subject,
      html: finalHtml,
      text: textFallback,
    });

    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ Email error:`, error.message);
    return false;
  }
};
