"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token")

class UserController {
  index({ auth }) {
    
    return "Hello World";

  }

  async revokeUserToken ({ request, auth, response }) {
    try{
      const token = auth.getAuthHeader()

      auth.authenticator("jwt").revokeTokens([token], true);

      return response.send("Work");
    } catch(e) {
		  return response.send("Not work");
	  }
  }

  async show(){
    const user = await User.query().with('addresses').fetch(); // Return user with address

    return user;
  }

  async myPosts ({ response, auth }) {
    const user = await User.find(auth.user.id); 
    const posts = await user.posts().fetch();
    return response.send(posts)
  }

  


}

module.exports = UserController;
