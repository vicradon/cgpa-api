"use strict";

const User = use("App/Models/User");
const Preference = use("App/Models/Preference");
const Cumulative = use("App/Models/Cumulative");
const GradeSystem = use("App/Models/GradeSystem");
const { validateAll } = use("Validator");

class UserController {
  async register({ auth, request, response }) {
    try {
      const { email, password, grade_system } = request.all();

      const rules = {
        email: "required|email|unique:users,email",
        password: "required|min:8",
        grade_system: "in:4,5",
      };
      const validation = await validateAll(request.all(), rules);

      if (validation.fails()) {
        return response.status(400).send(validation.messages());
      }

      const user = await User.create({
        email,
        password,
      });

      const preference = new Preference();
      const cumulative = await Cumulative.create({
        credit_load: 0,
        grade_point: 0,
        grade_point_average: 0,
      });

      const gradeSystemInstance = await GradeSystem.findBy(
        "point",
        grade_system | "5"
      );

      await preference.gradeSystem().associate(gradeSystemInstance);

      await user.preference().save(preference);
      await user.cumulative().save(cumulative);

      const authedUser = await auth.withRefreshToken().attempt(email, password);
      return response.status(201).send(authedUser);
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  }

  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all();
      const rules = {
        email: "required|email",
        password: "required|min:8",
      };
      const validation = await validateAll(request.all(), rules);

      if (validation.fails()) {
        return response.status(400).send(validation.messages());
      }
      const authedUser = await auth.withRefreshToken().attempt(email, password);

      return response.status(200).send(authedUser);
    } catch (error) {
      return response.status(404).send(error);
    }
  }

  async show({ auth, response }) {
    try {
      const user = await auth.user;
      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  async updateProfile({ auth, request, response }) {
    try {
      const { firstName, lastName } = request.all();
      const rules = {
        firstName: "required",
        lastName: "required",
      };
      const validation = await validateAll(request.all(), rules);

      if (validation.fails()) {
        return response.status(400).send(validation.messages());
      }

      const user = await auth.user;
      user.firstName = firstName;
      user.lastName = lastName;

      await user.save();
      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

module.exports = UserController;
