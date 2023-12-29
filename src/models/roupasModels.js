const connection = require('./connect')



const getAll = async () => {
    const client = await connection();

    try {
        const res = await client.query('SELECT * FROM TB_PRODUTO')
        return res.rows
    } catch (err){
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const addRoupa = async (roupa) => {
    const client = await connection();

    try {
        const  { img, name, value, stock  } = roupa;

        const createdRoupa = await client.query('insert into tb_produto (img_produto, nm_produto, vlr_produto, qtd_estoque) values ($1, $2, $3, $4);', [img, name, value, stock])
        return createdRoupa
    } catch(err) {
        console.log(err)
    } finally {
        console.log('Fechando conexão...')
        await client.end()
    }
}

const deleteRoupa  = async (id) => {
    const client = await connection();

    try {
        const removedRoupa = await client.query('delete from tb_produto where id_produto = $1', [id])
        return removedRoupa
    }catch(err) {
        return err
    } finally {
        await client.end()
    }
   
    
}

const updateRoupa = async (id, roupa) => {
    const client = await connection()

    try {
        const {name} = roupa
    
        const updateRoupa = await client.query('update tb_produto set nm_produto = $1 where id_produto = $2', [name, id])
        
        return updateRoupa
    } catch(err){
        return err
    } finally {
        await client.end()
    }

}

module.exports = {
    getAll,
    addRoupa,
    deleteRoupa,
    updateRoupa
}
