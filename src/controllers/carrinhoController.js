const {response} = require("express")
const carrinhoModels = require('../models/carrinhoModels')

const getAll = async (_request, response) => {
    try {
        const carrinho = await carrinhoModels.getAll()
        return response.status(200).json(carrinho)
    } catch (err) {
        return err + 'Não foi possivel retornar os dados...'
    }
}

const addCarrinho = async (request, response) => {
    try {
        const carrinho = await carrinhoModels.addCarrinho(request.body)
        response.status(201).json(carrinho)
        return 'Valor inseridos com sucesso!'

    } catch (err) {
        return err + 'Não foi possivel retornar os dados...'
    }
}

const deleteCarrinho = async (request, response) => {
    const {id} = request.params

    try {
        await carrinhoModels.deleteCarrinho(id)
        return response.status(204).json()
    } catch (err) {
        return err + 'Não foi possivel retornar os dados...'
    }
} 

const updateCarrinho = async (request, response) => {
    const {id} = request.params
    try {
        await carrinhoModels.updateCarrinho(id, request.body)
        return response.status(204).json()
    } catch (err) {
        return err + 'Não foi possivel retornar os dados...'
    }
}


module.exports = {
    getAll,
    addCarrinho,
    deleteCarrinho,
    updateCarrinho
}