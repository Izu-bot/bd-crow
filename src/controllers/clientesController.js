const {response} = require("express")
const clienteModels = require('../models/clientesModels')

const getAll = async (_request, response) => {
    try {
        const cliente = await clienteModels.getAll()

        return response.status(200).json(cliente)
    } catch(err) {
        return err + 'Não foi possivel retornar os dados...'
    }
}

const addCliente = async (request, response) => {
    try {
        const createdClient = await clienteModels.addCliente(request.body)
        response.status(201).json(createdClient)

        return 'Cliente cadastrado com sucesso!'
    } catch (err) {
        return err + 'Não foi possivel cadastrar o cliente...'
    }
}

const deleteCliente = async (request, response) => {
    const {id} = request.params

    await clienteModels.deleteCliente(id)
    return response.status(204).json()
}

const updateCLiente = async (request, response) => {
    const {id} = request.params
    await clienteModels.updateCliente(id, request.body)
    return response.status(204).json()
}

module.exports = {
    getAll,
    addCliente,
    deleteCliente,
    updateCLiente
}