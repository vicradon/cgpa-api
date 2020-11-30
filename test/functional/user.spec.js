"use strict";

const { test, trait } = use("Test/Suite")("User");

trait("Test/ApiClient");
trait("Auth/Client");

const User = use("App/Models/User");

test("registers a new user", async ({ client }) => {
  const response = await client
    .post(`/api/v1/register`)
    .send({
      email: "test-user-1@email.com",
      password: "some password",
      grade_system: "5",
    })
    .end();

  await response.assertStatus(201);
});

test("updates a user's profile", async ({ client }) => {
  const user = await User.create({
    email: "some-other-email@email.com",
    password: "some password",
  });
  const response = await client
    .patch(`/api/v1/users/profile`)
    .loginVia(user, "jwt")
    .send({
      firstName: "John",
      lastName: "Doe",
    })
    .end();
  await response.assertStatus(200);

  await response.assertJSONSubset({
    firstName: "John",
    lastName: "Doe",
  });
});
