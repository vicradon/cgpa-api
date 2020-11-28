"use strict";

const GradeSystem = use("App/Models/GradeSystem");

class GradeSystemSeeder {
  async run() {
    const points = [4, 5];
    for (let point of points) {
      const system = new GradeSystem();
      system.point = point;

      ["A", "B", "C", "D"].map((grade, index) => {
        system[grade] = point - index;
      });

      system["F"] = 0;

      await system.save();
    }
  }
}

module.exports = GradeSystemSeeder;
