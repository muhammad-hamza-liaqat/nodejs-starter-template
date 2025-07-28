const User = require("../models/user.model");
const { hashPassword } = require("../helpers/bcrypt");

const seedAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log("👤 Admin already exists.");
    return;
  }

  const hashedPassword = await hashPassword(
    process.env.ADMIN_PASSWORD || "1234567a-"
  );

  const adminUser = new User({
    name: process.env.ADMIN_NAME || "Admin",
    email: adminEmail,
    password: hashedPassword,
  });

  await adminUser.save();
  console.log("✅ Admin seeded successfully.");
};

module.exports = { seedAdminUser };
