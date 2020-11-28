"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CumulativeSchema extends Schema {
  up() {
    this.create("cumulatives", (table) => {
      table.increments();
      table.timestamps();
      table.integer("credit_load").unsigned();
      table.integer("grade_point").unsigned();
      table.decimal("grade_point_average", 20, 2).unsigned();
      table
        .integer("user_id")
        .unsigned()
        .nullable()
        .unique()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.drop("cumulatives");
  }
}

module.exports = CumulativeSchema;
