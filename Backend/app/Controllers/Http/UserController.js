"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token")

class UserController {
  index({ auth }) {


    return "Hello World";

  }

  async revokeUserToken ({ request, auth, response }) {
    try{
      const refreshToken = request.input('refresh_token');
      
      await auth
        .authenticator('jwt')
        .revokeTokens([refreshToken])

      return response.send("Work");
    } catch(e) {
		  return response.send("Not work");
	  }
  }

  async show(){
    const user = await User.all();

    return user;
  }
}

module.exports = UserController;
