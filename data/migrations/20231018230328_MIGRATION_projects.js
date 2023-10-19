/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('project', tbl => {
    tbl.increments('project_id').primary();
    tbl.string('project_name').notNullable();
    tbl.text('project_description');
    tbl.boolean('project_completed').defaultTo(false);
  });
};
exports.up = function(knex) {
  return knex.schema.createTable('resources', tbl => {
    tbl.increments('resource_id').primary();
    tbl.string('resource_name').notNullable().unique();
    tbl.text('resource_description').nullable();
  });
};
exports.up = function(knex) {
    return knex.schema.createTable('tasks', tbl => {
        tbl.increments('task_id').primary()
        tbl.text('task_description').notNullable()
        tbl.text('task_notes')
        tbl.boolean('task_completed').defaultTo(false);
        tbl.integer('project_id')
            .notNullable()
            .references('project_id')
            .inTable('project')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('project')
};
