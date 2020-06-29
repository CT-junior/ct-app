"use strict";

const User = use("App/Models/User");
const Address = use("App/Models/Address");

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

    const token = await auth
      .withRefreshToken()
      .attempt(email, password)

    return token;
  }

  async authenticate_refresh({request, auth}) {

    /** Revoking Token */ 
    /** Could be UserController.revokeUserToken ({ auth }) ???*/
    const user = auth.current.user
    const token = auth.getAuthHeader()

    const refreshToken = request.input('refresh_token');

    await user
      .tokens()
      .where('token', token)
      .update({ is_revoked: true })
    
    /** Creating other token */
    
    const token2 = await auth.newRefreshToken().generateForRefreshToken(refreshToken);

    return token2;
  }
}

module.exports = AuthController;
