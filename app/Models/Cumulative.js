"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Cumulative extends Model {
  static get hidden() {
    return ["created_at", "updated_at", "id", "user_id"];
  }
}

module.exports = Cumulative;
