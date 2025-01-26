exports.up = function (knex) {
  return knex.schema.createTable("customers", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
