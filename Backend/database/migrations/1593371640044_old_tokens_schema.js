'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OldTokensSchema extends Schema {
  up () {
    this.create('old_tokens', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('old_tokens')
  }
}

module.exports = OldTokensSchema
