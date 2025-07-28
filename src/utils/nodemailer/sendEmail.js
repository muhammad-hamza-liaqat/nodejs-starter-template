const { transporter } = require("./transporter");
const path = require("path");

const sendEmail = async (templateName, data) => {
  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "..",
      "emailTemplates",
      `${templateName}.js`
    );
    const template = require(templatePath);

    const { subject, html } = template(data);

    const mailOptions = {
      from: `"🚀 Node.js Support Team" <${process.env.MY_CUSTOM_EMAIL}>`,
      to: data.to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    // console.log(`Email sent to ${data.to} using template ${templateName}`);
  } catch (error) {
    console.error(
      `Failed to send "${templateName}" email to ${data?.to}:`,
      error.message
    );
  }
};

module.exports = { sendEmail };
