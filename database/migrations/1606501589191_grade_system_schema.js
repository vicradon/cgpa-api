"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GradeSystemSchema extends Schema {
  up() {
    this.create("grade_systems", (table) => {
      table.increments();
      table.timestamps();
      table.integer("point").notNullable();
      ["A", "B", "C", "D", "E", "F"].map((grade) => {
        table.integer(grade).unsigned();
      });
    });
  }

  down() {
    this.drop("grade_systems");
  }
}

module.exports = GradeSystemSchema;
