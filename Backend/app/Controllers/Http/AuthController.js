"use strict";


const Address = use("App/Models/Address");
//Helpers to handle file upload
const Helpers = use('Helpers');
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
    const lastUserInserted =  await User.pickInverse();
    
    await console.log(lastUserInserted["name"]);
    data["profile_pic"] = "profile_pics/"+(lastUserInserted['id'] + 1); 
    const user = await User.create(data);
    this.uploadImg("profile_pics",request); 
   
    return user;
  }
  async uploadImg(direct,request){ 
    const profilePic = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    
    await profilePic.move(Helpers.tmpPath(direct), {
      name: 'imagem.jpg',
      overwrite: true
    })
  
    if (!profilePic.moved()) {
      return profilePic.error()
    }
    return 'File moved'



  }
  async authenticate({ request, auth, response }) {
    const { email, password } = request.all();

    const token = await auth
      .withRefreshToken()
      .attempt(email, password)

    return token;
  }

}

module.exports = AuthController;
