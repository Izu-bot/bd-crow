const {response} = require("express")
const detalheModel = require('../models/detalhesModels')

const getAll = async (_request, response) => {
    try {
        const detalhe = await detalheModel.getAll()

        return response.status(200).json(detalhe)
    } catch (err) {
        return 'Um erro inesperado aconteceu...' + err
    }
}

const addDetalhe = async (request, response) => {
    try {
        const add = await detalheModel.addDetalhe(request.body)
        response.status(201).json(add)

        return 'Valor inserido com sucesso!'
    } catch (err) {
        return 'Um erro inesperado aconteceu...' + err
    }
}

const deleteDetalhe = async (request, response) => {
    const {id} = request.params
    try {
        await detalheModel.deleteDetalhe(id)

        return response.status(204).json()
    } catch (err) {
        return 'Um erro inesperado aconteceu...' + err
    }
}

const updateDetalhe = async (request, response) => {
    const {id} = request.params
    try {
        await detalheModel.updateDetalhe(id, request.body)
        return response.status(204).json()
    } catch (err) {
        return 'Um erro inesperado aconteceu...' + err
    }
}

module.exports = {
    getAll,
    addDetalhe,
    deleteDetalhe,
    updateDetalhe
}