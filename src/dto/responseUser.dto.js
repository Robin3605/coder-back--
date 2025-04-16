export class UserResponseDto {
  constructor(user) {
    this.fullName = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
  }

  age(user) {
    try {
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
