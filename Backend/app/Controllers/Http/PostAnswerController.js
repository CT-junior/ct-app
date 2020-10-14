'use strict'
const Post = use("App/Models/Post");
const PostAnswer = use("App/Models/PostAnswer");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with postanswers
 */
class PostAnswerController {
  /**
   * Show a list of all postanswers.
   * GET postanswers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new postanswer.
   * GET postanswers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, auth }) {
    const data =  request.only(["content","post_id"]);
    data['user_id'] = await auth.user.id ;
  
    //const post = await Post.find(data['post_id']); 

    const postAnswer = await PostAnswer.create(data);
    
    return response.send(postAnswer);
  }

  /**
   * Create/save a new postanswer.
   * POST postanswers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single postanswer.
   * GET postanswers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response}) {
    const answer = await PostAnswer.findOrFail(params.id)
    
    return response.send(answer)
  }
  

  /**
   * Render a form to update an existing postanswer.
   * GET postanswers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update postanswer details.
   * PUT or PATCH postanswers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(["content"]);
    const answer = await PostAnswer.findOrFail(params.id);
   
   
    if(answer.user_id ==! auth.user.id) {
      return response.status(401);
    }
    answer.content = data['content'];
    answer.save();
    
    return response.send(answer);  
  }
  /**
   * Show all posts from a specific user.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async answersFromPost({params,response}){ 
    const data = params.id
    const post = await Post.find(data)
    const answers = await post.postAnswers().fetch()
      return response.send(answers)
  }

  /**
   * Delete a postanswer with id.
   * DELETE postanswers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    const answer = await PostAnswer.findOrFail(params.id);
    console.log(auth.user.id)
    
    if(answer.user_id ==! auth.user.id) {
      return response.status(401);
    }

    return answer.delete()
  }
}

module.exports = PostAnswerController
