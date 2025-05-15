export const validateData = (...data) => {
  for (const item of data) {
    if (item === undefined || item === null) {
      throw new Error(
        "Datos no proporcionados, debes proporcionar todos los datos",
        400
      );
    }
  }
};
