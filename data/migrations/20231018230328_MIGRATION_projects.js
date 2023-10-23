/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
    tbl.increments('project_id').primary();
    tbl.string('project_name').notNullable();
    tbl.text('project_description');
    tbl.boolean('project_completed').defaultTo(false);
  })
  .createTable('resources', tbl => {
    tbl.increments('resource_id').primary();
    tbl.string('resource_name').notNullable().unique();
    tbl.text('resource_description').nullable();
  })
  .createTable('tasks', tbl => {
    tbl.increments('task_id').primary()
    tbl.text('task_description').notNullable()
    tbl.text('task_notes')
    tbl.boolean('task_completed').defaultTo(false);
    tbl.integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects')
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
    .dropTableIfExists('projects')
};
