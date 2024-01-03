const connection = require('./connect')

const getAll = async () => {
    const client = await connection()
    try {
        const res = await client.query('select * from tb_detalhe_pedido')
        return res.rows
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando a conexão')
        await client.end()
    }
}

const addDetalhe = async (detalhePedido) => {
    const client = await connection()
    try {
        const {pedido, produto, qtd, vlr} = detalhePedido

        const add = await client.query('insert into tb_detalhe_pedido (id_pedido, id_produto, ds_quantidade, vlr_unitario) values ($1, $2, $3, $4);', [pedido, produto, qtd, vlr])
        return add
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando a conexão')
        await client.end()
    }
}

const deleteDetalhe = async (id) => {
    const client = await connection()
    try {
        const dell = await client.query('delete from tb_detalhe_pedido where id_detalhe = $1', [id])
        return dell
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando a conexão')
        await client.end()
    }
}

const updateDetalhe = async (id, detalhe) => {
    const client = await connection()

    try {
        const {qtd, vlr} = detalhe
        const sql = 'update tb_detalhe_pedido set ds_quantidade = $1, vlr_unitario = $2 where id_detalhe = $3;'
        const upd = await client.query(sql, [qtd, vlr, id])
        return upd
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando a conexão')
        await client.end()
    }
}

module.exports = {
    getAll,
    addDetalhe,
    deleteDetalhe,
    updateDetalhe
}