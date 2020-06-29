'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OldToken extends Model {
    tokens(){
        return this.hasMany("App/Models/Token");
    }
}

module.exports = OldToken
