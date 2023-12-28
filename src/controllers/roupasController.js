const { response } = require("express")
const roupasModels = require("../models/roupasModels")

const getAll = async (_request, response) => {

    const roupas = await roupasModels.getAll()

    return response.status(200).json(roupas);
}

const createdRoupa = async (request, response) => {
    const createRoupa = await roupasModels.addRoupa(request.body)
    response.status(201).json(createRoupa)

    return console.log('Valor inserido com sucesso!')
}

module.exports = {
    getAll,
    createdRoupa
}