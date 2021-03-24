exports.seed = function (knex) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          username: "jack sparrow",
          password: 1234,
          department: "math",
        },
        {
          id: 2,
          username: "sherlock holmes",
          password: 1234,
          department: "math",
        },
        {
          id: 3,
          username: "frodo baggins",
          password: 1234,
          department: "science",
        },
      ]);
    });
};