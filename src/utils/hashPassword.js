import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  if (typeof password !== "string") {
    throw new Error("Password must be a string");
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export const comparePassword = (plainPassword, hashedPassword) => {
  if (typeof plainPassword !== "string" || typeof hashedPassword !== "string") {
    throw new Error("Passwords must be strings");
  }

  return bcrypt.compareSync(plainPassword, hashedPassword);
};
