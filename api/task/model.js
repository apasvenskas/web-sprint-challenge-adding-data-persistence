// build your `Task` model here
const db = require('.../data/db-config');

function getAll() {
    return db('task');
}

function getById(id) {
    return db('task').where({id}).first();
}

async function add(task) {
    const[id] = await db('task').insert(task);
    return getById(id);
}

module.exports = {
    add,
    getAll,
    getById
}
