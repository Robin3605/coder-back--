import { faker } from "@faker-js/faker";


const createMockUser = () => {
  const roles = ["user", "admin", "public"];
  const first_name = faker.person.firstName().toLowerCase();
  const last_name = faker.person.lastName().toLowerCase();
  const age = faker.number.int({ min: 18, max: 65 });
  const email = first_name + "@gmail.com";
  const password = "hola1234";
  const role = roles[faker.number.int({ min: 0, max: 2 })];
  return { first_name, last_name, age, email, password, role };
};



//console.log(createMockUser());
export default createMockUser;