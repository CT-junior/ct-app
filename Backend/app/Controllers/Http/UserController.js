"use strict";

class UserController {
  index() {
    return "Hello World";
  }

  async store({ request, response }) {
    const {
      name,
      email,
      phone,
      role,
      team,
      birthdate,
      password,
    } = request.body;
  }
}

module.exports = UserController;
