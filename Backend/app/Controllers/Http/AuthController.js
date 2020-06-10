"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only([
      "name",
      "email",
      "phone",
      "role",
      "team",
      "birthdate",
      "password",
    ]);
    const user = User.create(data);
    return user;
  }

  async authenticate({ request, auth, response }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController;
