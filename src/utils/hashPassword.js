import bcrypt from "bcrypt";

// Función que hashea el password
export const hashPassword = (password) => {
    // Asegúrate de que `password` sea una cadena
    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }
  
    // Genera un salt (número de rondas de hashing)
    const saltRounds = 10; // Número de rondas recomendado
    const salt = bcrypt.genSaltSync(saltRounds);
  
    // Hashea la contraseña
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    return hashedPassword;
  };

// Función que compara los password
// export const comparePassword = (userPassword, receivedPassword) => {
//   return  bcrypt.compareSync(receivedPassword, userPassword);
// }

export const comparePassword = (plainPassword, hashedPassword) => {
    // Asegúrate de que ambas contraseñas sean cadenas
    if (typeof plainPassword !== "string" || typeof hashedPassword !== "string") {
      throw new Error("Passwords must be strings");
    }
  
    // Compara las contraseñas
    return bcrypt.compareSync(plainPassword, hashedPassword);
  };