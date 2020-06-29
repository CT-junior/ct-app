"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("zipcode").notNullable();
      table.string("street").notNullable();
      table.string("neighborhood").notNullable();
      table.string("number").notNullable();
      table.string("complement");
      table.string("city");
      table.string("country");
      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
