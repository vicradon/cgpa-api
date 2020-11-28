"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Preference extends Model {
  gradeSystem() {
    return this.belongsTo("App/Models/GradeSystem");
  }
}

module.exports = Preference;
