const connection = require('./connect')

const getAll = async () => {
    const client = await connection()

    try {
        const res = await client.query('select * from tb_carrinho;')

        return res.rows
    } catch(err){
        console.log(err)
    } finally {
        console.log("Fechando conexão...")
        await client.end()
    }
}

const addCarrinho = async (carrinho) => {
    const client = await connection()

    try {
        const {cliente, produto, qtd, vlr} = carrinho
        const sql = 'insert into tb_carrinho (id_cliente, id_produto, ds_quatidade, vlr_total) values ($1, $2, $3, $4);'
        const add = await client.query(sql, [cliente, produto, qtd, vlr])

        return add
    } catch (err) {
        console.log(err)
    } finally {
        console.log("Fechando conexão...")
        await client.end()
    }
}

const deleteCarrinho = async (id) => {
    const client = await connection()
    
    try {
        const dell = await client.query('delete from tb_carrinho where id_carrinho = $1', [id])
        return dell
    } catch (err) {
        console.log(err)
    } finally {
        console.log("Fechando conexão...")
        await client.end()
    }
}

const updateCarrinho = async (id, carrinho) => {
    const client = await connection()

    try {
        const {produto, qtd, vlr} = carrinho

        const sql = 'update tb_carrinho set id_produto = $1, ds_quatidade = $2, vlr_total = $3 where id_carrinho = $4'
        const upd = await client.query(sql, [produto, qtd, vlr, id])
        return upd
    } catch (err) {
        console.log(err)
    } finally {
        console.log("Fechando conexão...")
        await client.end()
    }
}

module.exports = {
    getAll,
    addCarrinho,
    deleteCarrinho,
    updateCarrinho
}