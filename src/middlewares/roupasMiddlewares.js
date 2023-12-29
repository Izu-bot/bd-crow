const validadeBody = (request, response, next) => {
    const {body} = request

    if(body.name === undefined){
        return response.status(400).json({message: 'Verifique o campo "name" da requisição.'})
    }

    if(body.name == '' ) {
        return response.status(400).json({message: 'O campo "name" não pode ser vazio.'})
    }

    next()
}

module.exports = {
    validadeBody
}