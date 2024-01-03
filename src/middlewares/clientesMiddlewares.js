const validadeBody = (request, response, next) => {
    const {body} = request

    if (body.name === undefined) {
        return response.status(400).json({"message": "O nome do cliente não pode ser indefinido."})
    }

    if (body.name == '') {
        return response.status(400).json({"message": "O nome do clinte não pode ser vazio."})
    }

    next()
}

module.exports = {
    validadeBody
}
