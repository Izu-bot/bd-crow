async function connect() {
    if(global.connection)
        return global.connection.connect();

    const {Pool} = require('pg')
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING,
        max:100000000
    })

    global.connection = pool;
    return pool.connect();
}

module.exports = connect