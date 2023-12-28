async function connect() {
    if(global.connection)
        return global.connection.connect();

    const {Pool} = require('pg')
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    })

    global.connection = pool;
    return pool.connect();
}

module.exports = connect