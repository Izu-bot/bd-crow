const connection = require('./connect')

const getAll = async () => {
    const client = await connection();

    try {
        const res = await client.query('select id_produto, nm_produto, vlr_produto from tb_produto');
        return res.rows.map(row => ({
            id_produto: row.id_produto,
            nm_produto: row.nm_produto,
            vlr_produto: row.vlr_produto,
            img_produto: row.img_produto
        }));
    } catch (err) {
        console.log(err);
    } finally {
        console.log('Fechando conexão...');
        await client.end();
    }
}

const getId = async (id) => {
    const client = await connection()

    try {
        const res = await client.query('select id_produto, nm_produto, vlr_produto, qtd_estoque from tb_produto where id_produto = $1', [id])
        return res.rows.map(row => ({
            id_produto: row.id_produto,
            nm_produto: row.nm_produto,
            vlr_produto: row.vlr_produto,
            img_produto: row.img_produto,
            qtd_estoque: row.qtd_estoque
        }));
    } catch (err) {
        console.log(err);
    } finally {
        console.log('Fechando conexão...');
        await client.end();
    }
}


const addRoupa = async (roupa) => {
    const client = await connection();

    try {
        const { name, value, stock } = roupa

        const createdRoupa = await client.query('insert into tb_produto (nm_produto, vlr_produto, qtd_estoque) values ($1, $2, $3);', [name, value, stock])
        return createdRoupa
    } catch (err) {
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const deleteRoupa = async (id) => {
    const client = await connection();

    try {
        const removedRoupa = await client.query('delete from tb_produto where id_produto = $1', [id])
        return removedRoupa
    } catch (err) {
        return err
    } finally {
        await client.end()
    }
}

const updateRoupa = async (id, roupa) => {
    const client = await connection()

    try {
        const { name } = roupa

        const updateRoupa = await client.query('update tb_produto set nm_produto = $1 where id_produto = $2', [name, id])

        return updateRoupa
    } catch (err) {
        return err
    } finally {
        console.log("Fechando conexão...")
        await client.end()
    }

}

module.exports = {
    getAll,
    getId,
    addRoupa,
    deleteRoupa,
    updateRoupa
}
