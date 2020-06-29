'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PostAnswer extends Model {
    users(){
        return this.belongsTo('App/Models/User');
    }

    posts(){
        return this.belongsTo('App/Models/Post');
    }
}

module.exports = PostAnswer
