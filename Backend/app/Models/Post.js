'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    postAnswers(){
        return this.hasMany("App/Model/PostAnswer");
    }
    
}

module.exports = Post
