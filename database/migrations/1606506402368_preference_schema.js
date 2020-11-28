"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PreferenceSchema extends Schema {
  up() {
    this.create("Preferences", (table) => {
      table.increments();
      table.timestamps();
      table
        .integer("grade_system_id")
        .unsigned()
        .references("id")
        .inTable("grade_systems")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("user_id")
        .unsigned()
        .nullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.drop("Preferences");
  }
}

module.exports = PreferenceSchema;
