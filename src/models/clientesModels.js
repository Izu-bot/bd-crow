const connection = require('./connect')
const bcrypt = require('bcrypt')

const getAll = async () => {
    const client = await connection()

    try {
        const res = await client.query('select id_cliente, nm_cliente, ds_sobrenome, ds_endereco, ds_cpf, dt_nascimento from tb_cliente')
        return res.rows.map(row => ({
            id_cliente: row.id_cliente,
            nm_cliente: row.nm_cliente,
            ds_sobrenome: row.ds_sobrenome,
            ds_endereco: row.ds_endereco,
            ds_cpf: row.ds_cpf,
            dt_nascimento: row.dt_nascimento
        }))
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const addCliente = async (cliente) => {
    const client = await connection()

    try {
        const { name, surname, address, cpf, date, email, senha } = cliente
        const sqlCliente = 'insert into tb_cliente (nm_cliente, ds_sobrenome, ds_endereco, ds_cpf, dt_nascimento) values ($1, $2, $3, $4, $5) RETURNING id_cliente'

        // Insere o cliente e captura o ID gerado
        const createdClient = await client.query(sqlCliente, [name, surname, address, cpf, new Date(date).toDateString()])
        const idCliente = createdClient.rows[0].id_cliente

        // Insere as credenciais do cliente
        const senhaHash = await bcrypt.hash(senha, 10);
        const sqlCredenciais = 'insert into tb_dados (id_cliente, email, senha) values ($1, $2, $3)'
        await client.query(sqlCredenciais, [idCliente, email, senhaHash])

        return createdClient
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const deleteCliente = async (id) => {
    const client = await connection()

    try {
        const removeClient = await client.query('delete from tb_cliente where id_cliente = $1;', [id])
        return removeClient
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const updateCliente = async (id, cliente) => {
    const client = await connection()

    try {
        const { address } = cliente

        const updateCliente = await client.query('update tb_cliente set ds_endereco = $1 where id_cliente = $2', [address, id])
        return updateCliente
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const listClient = async (id) => {
    const client = await connection()

    try {
        const sql = `
    SELECT 
        c.nm_cliente,
        c.ds_sobrenome,
        c.ds_endereco,
        c.ds_cpf,
        c.dt_nascimento,
        d.email,
        d.senha
    FROM 
        tb_cliente c
    INNER JOIN 
        tb_dados d ON c.id_cliente = d.id_cliente
    WHERE 
        c.id_cliente = $1;`;

        const res = await client.query(sql, [id]);

        return res.rows.map(row => ({
            nm_cliente: row.nm_cliente,
            ds_sobrenome: row.ds_sobrenome,
            ds_endereco: row.ds_endereco,
            ds_cpf: row.ds_cpf,
            dt_nascimento: row.dt_nascimento,
            email: row.email,
            senha: row.senha,
        }));


    } catch (err) {
        console.log(err);
    } finally {
        console.log('Fechando conexão...');
        await client.end();
    }
}

module.exports = {
    getAll,
    addCliente,
    deleteCliente,
    updateCliente,
    listClient
}