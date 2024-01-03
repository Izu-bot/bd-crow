const connection = require('./connect')

const getAll = async () => {
    const client = await connection()

    try {
        const res = await client.query('select * from tb_cliente;')
        return res.rows
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
        const { name, surname, address, cpf, date} = cliente
        
        const convertDate = new Date(date)
        const formatDate = convertDate.toISOString()


        const sql = 'insert into tb_cliente (nm_cliente, ds_sobrenome, ds_endereco, ds_cpf, dt_nascimento) values ($1, $2, $3, $4, $5);'

        const createdClient = await client.query(sql, [name, surname, address, cpf, formatDate])
        return createdClient
    } catch(err) {
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
    } catch(err) {
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const updateCliente = async (id, cliente) => {
    const client = await connection()

    try {
        const {address} = cliente
        
        const updateCliente = await client.query('update tb_cliente set ds_endereco = $1 where id_cliente = $2', [address, id])
        return updateCliente
    } catch(err) {
        console.log(err)
    }finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

module.exports = {
    getAll,
    addCliente,
    deleteCliente,
    updateCliente
}