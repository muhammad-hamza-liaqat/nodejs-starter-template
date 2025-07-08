const bcrypt = require('bcryptjs');

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;

if (!SALT_ROUNDS || isNaN(SALT_ROUNDS)) {
    throw new Error("BCRYPT_SALT_ROUNDS is not defined or invalid in the environment variables.");
}

const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    return await bcrypt.hash(plainPassword, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};
