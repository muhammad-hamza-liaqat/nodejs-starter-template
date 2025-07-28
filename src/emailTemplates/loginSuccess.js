module.exports = (data) => {
  const formattedName = data.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const loginTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return {
    subject: "🎉 Login Successful",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #4CAF50; padding: 20px; color: white; text-align: center;">
          <h2 style="margin: 0;">Welcome Back, ${formattedName} 👋</h2>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <p style="font-size: 16px;">You have <strong>successfully logged in</strong> to your account.</p>
          <p style="font-size: 16px; color: #555;">🕒 <strong>Login Time:</strong> ${loginTime}</p>
          <p style="font-size: 14px; color: #999; margin-top: 30px;">If this wasn't you, please contact our support team immediately to secure your account.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #aaa;">
          &copy; ${new Date().getFullYear()} Samaritan Technologies. All rights reserved.
        </div>
      </div>
    `,
  };
};
