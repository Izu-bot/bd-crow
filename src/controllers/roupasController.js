const { response } = require("express")
const roupasModels = require("../models/roupasModels")

const getAll = async (_request, response) => {

    try {
        const roupas = await roupasModels.getAll()

        return response.status(200).json(roupas)
    } catch (err) {
        return err + 'Não foi possivel retornar os dados...'
    }

}

const createdRoupa = async (request, response) => {

    try {
        const createRoupa = await roupasModels.addRoupa(request.body)
        response.status(201).json(createRoupa)

        return 'Valor inserido com sucesso!'
    } catch (err) {
        return 'Um erro inesperado aconteceu...' + err
    }

}

const deleteRoupa = async (request, response) => {
    const { id } = request.params

    await roupasModels.deleteRoupa(id)
    return response.status(204).json()

}

const updateRoupa = async (request, response) => {
    const { id } = request.params


    await roupasModels.updateRoupa(id, request.body)
    return response.status(204).json()
}

module.exports = {
    getAll,
    createdRoupa,
    deleteRoupa,
    updateRoupa
}