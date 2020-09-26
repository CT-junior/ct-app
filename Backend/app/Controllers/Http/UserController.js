'use strict';

const AddressController = require('./AddressController');
const Helpers = use('Helpers')
const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Address = use('App/Models/Address');

class UserController {
  async index({ auth }) {
    return await User.all(); // Return user with address
  }

  async revokeUserToken({ request, auth, response }) {
    try {
      const token = auth.getAuthHeader();

      auth.authenticator('jwt').revokeTokens([token], true);

      return response.send('Work');
    } catch (e) {
      return response.send('Not work');
    }
  }

  async show({ auth }) {
    return await User.findOrFail(auth.user.id);
  }

  async myPosts({ response, auth }) {
    const user = await User.find(auth.user.id);
    const posts = await user.posts().fetch();
    return response.send(posts);
  }

  async myAddress({ response, auth }) {
    const user = await User.find(auth.user.id);
    const address = await user.addresses().fetch();
    return response.send(address);
  }

  async list_address({ auth }) {
    const user = await User.query().with('addresses').fetch(); // Return user with address

    return user;
  }

  async home({ response }) {
    return 'Hello World';
  }

  async address({ params, response }) {
    const user = await User.find(params.user_id);
    const address = await user.addresses().fetch();
    // const address = await Address.query().where('user_id', '=', params.user_id).fetch(); /** Work too */

    return response.send(address);
  }
  async destroy({ params, auth, response }) {
    const user = await User.findOrFail(params.id);

    if (user.id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    await user.delete();
  }

  async uploadImg({params, request},direct){ 
    const profilePic = request.file('profile_pic', {
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
}

module.exports = UserController;
