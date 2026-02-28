import { faker } from '@faker-js/faker';

export class TestData {
  public static readonly username = faker.internet.username();
  public static readonly password = `Test@${faker.string.alphanumeric(8)}!`;
  public static readonly email = faker.internet.email();

  static generateNewUser() {
    return {
      username: faker.internet.username(),
      password: `Test@${faker.string.alphanumeric(8)}!`
    };
  }
}