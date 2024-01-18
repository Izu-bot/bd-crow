const connection = require('./connect')

const realizarLogin = async (email) => {
    const client = await connection()

    try {
        const login = await client.query('select id_cliente, senha from tb_dados where email = $1', [email])
        return login.rows.length === 1 ? login.rows[0] : null
    } catch (error){
        console.error(error)
    }
}

module.exports = {
    realizarLogin
}