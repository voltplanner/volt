const pg = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const { Client } = pg

const client = new Client(process.env.DATABASE_URL)

client.connect()
    .then(() => {
        return client.query(`
            SELECT generation_expression
            FROM information_schema.columns 
            WHERE table_schema='tasks' AND table_name='task' AND column_name='fulltext';
        `)
    })
    .then((res) => {
        if (res.rows[0].generation_expression) {
            return client.query(`
                ALTER TABLE tasks.task ALTER COLUMN fulltext DROP EXPRESSION;
            `)
        }
    })
    .then(() => {
        return client.query(`
            SELECT generation_expression
            FROM information_schema.columns 
            WHERE table_schema='tasks' AND table_name='task_project' AND column_name='fulltext';
        `)
    })
    .then((res) => {
        if (res.rows[0].generation_expression) {
            return client.query(`
                ALTER TABLE tasks.task_project ALTER COLUMN fulltext DROP EXPRESSION;
            `)
        }
    })
    .finally(() => {
        process.exit()
    })
