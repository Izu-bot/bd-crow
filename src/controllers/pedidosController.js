const request = require("express")
const pedidosModels = require('../models/pedidosModels')

const getAll = async (_request, response) => {
    try {
        const pedido = await pedidosModels.getAll()

        return response.status(200).json(pedido)
    } catch (err) {
        return err
    }
}

const addPedido = async (request, response) => {
    try {
        const pedido = await pedidosModels.addPedido(request.body)
        response.status(201).json(pedido)

        return 'Pedido inserido com sucesso'
    } catch (err){
        return err
    }
}

const deletePedido = async (request, response) => {
    try {
        const {id} = request.params
        await pedidosModels.deletePedido(id)
        return response.status(204).json()
    } catch (err) {
        return err
    }
}

const updatePedido = async (request, response) => {
    try {
        const {id} = request.params
        await pedidosModels.updatePedido(id, request.body)
        return response.status(204).json()
    } catch (err) {
        return err
    }
}

module.exports = {
    getAll,
    addPedido,
    deletePedido,
    updatePedido
}