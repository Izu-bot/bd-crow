const connection = require('./connect')

const getAll = async () => {
    const client = await connection()

    try {
        const res = await client.query("select * from tb_pedido;")

        return res.rows
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando a conexão...')
        await client.end()
    }
}

const addPedido = async (pedido) => {
    const client = await connection()

    try {
        const {cliente, data, endereco} = pedido

        const convertDate = new Date(data)
        const formatDate = convertDate.toISOString()

        const add = await client.query('insert into tb_pedido (id_cliente, dt_pedido, ds_endereco) values ($1, $2, $3)', [cliente, formatDate, endereco])
        return add
    } catch (err){
        console.log(err)
    } finally {
        console.log('Fechando a conexão...')
        await client.end()
    }
}

const deletePedido = async (id) => {
    const client = await connection()

    try {
        const dell = await client.query('delete from tb_pedido where id_pedido = $1', [id])
        return dell
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando a conexão...')
        await client.end()
    }
}

const updatePedido = async (id, pedido) => {
    const client = await connection()

    try {
        const {endereco} = pedido

        const upd = await client.query('update tb_pedido set ds_endereco = $1 where id_pedido = $2', [endereco, id])
        return upd
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando a conexão...')
        await client.end()
    }
}

module.exports = {
    getAll,
    addPedido,
    deletePedido,
    updatePedido
}