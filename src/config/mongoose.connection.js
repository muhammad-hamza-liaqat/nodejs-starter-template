const mongoose = require("mongoose");
const { seedAdminUser } = require("../seeders/adminSeeder");

const mongoURI = process.env.MONGO_URI;

(async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {});
    console.log("✅  MongoDB connected successfully!");
    console.log(`📍 Database Connection: ${connection.connection.host}`);
    await seedAdminUser();
    return connection;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();
