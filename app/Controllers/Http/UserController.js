"use strict";

const User = use('App/Models/User');
const { validateAll } = use("Validator");

class UserController {
  async register({ auth, request, response }) {
    try {
      const { email, password } = request.all();

      const rules = {
        email: "required|email|unique:users,email",
        password: "required|min:8",
      };
      const validation = await validateAll(request.all(), rules);

      if (validation.fails()) {
        return response.status(400).send(validation.messages());
      }

      const user = await User.create({
        email,
        password,
      });

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
        email: "required|email|unique:users,email",
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
}

module.exports = UserController;
