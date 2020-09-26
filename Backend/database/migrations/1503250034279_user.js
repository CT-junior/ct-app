"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("name", 80).notNullable().unique();
      table.string("email", 254).notNullable().unique();
      table.string("phone", 15).notNullable();
      table.string("role", 15).notNullable();
      table.string("team", 15).notNullable();
      table.string("birthdate", 12).notNullable();
      table.string("password", 60).notNullable();
      table.string("profile_pic",60); 
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
