const db = require("../../data/dbConfig");

function getAll() {
  return db("users");
}

function findBy(filter) {
  return db("users as u")
    .select("u.id", "u.username", "u.password", "u.department")
    .where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

function findById(id) {
  return db("users as u")
    .select("u.id", "u.username", "u.password", "u.department")
    .where("u.id", id)
    .first();
}

module.exports = {
  getAll,
  findBy,
  add,
  findById,
};
