import { faker } from "@faker-js/faker";


const createMockProduct = () => {
  const categories = [
    "Tablets",
    "Smartphones",
    "Laptops",
    "Watches"
  ];
  const title = faker.commerce.productName();
  const description = faker.commerce.productDescription();
  const category = categories[faker.number.int({ min: 0, max: 15 })];
  const price =  Number.parseInt(faker.commerce.price({ min: 10, max: 2000 }));
  const stock = faker.number.int({ min: 1, max: 1000 });
  const code = faker.string.uuid();
  return { title, description, category, price, stock, code };
};


export default createMockProduct;