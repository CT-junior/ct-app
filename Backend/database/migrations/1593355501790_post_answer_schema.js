'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostAnswerSchema extends Schema {
  up() {
    this.create('post_answers', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('content').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('post_answers');
  }
}

module.exports = PostAnswerSchema;
