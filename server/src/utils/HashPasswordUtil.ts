import bcrypt from "bcrypt";

export const hashedPassword = async (password: string) => {
  try {
    // Generate a salt with 10 rounds (or adjust based on security needs)
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};
export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
) => {
  try {
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
