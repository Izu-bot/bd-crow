require('dotenv').config();
const secretKey = process.env.SECRET_KEY
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const credenciaisModels = require('../models/credenciaisModels')

const realizarLogin = async (request, response) => {
    const {email, senha} = request.body

    try {
        const credenciais = await credenciaisModels.realizarLogin(email)

        if(credenciais) {
            const {id_cliente, senha: senhaHash} = credenciais

            if(await bcrypt.compare(senha, senhaHash)){
                // login bem sucedido

                // Gera o token JWT
                const token = jwt.sign({ userId: id_cliente, email }, secretKey, { expiresIn: '1h', subject: '1' });

                // Retorna o token na resposta
                return response.status(200).json({ message: 'Login bem sucedido!', id_cliente, token });
            } else {
                // senha incorreta
                return response.status(401).json({ message: 'Email ou senha inválidos...' });
            }
        } else {
            // email não encontrado
            return response.status(401).json({ message: 'Email ou senha inválidos..' });
        }
    } catch (error){
        console.error(`Erro ao realizar login ${error}`);
        response.status(500).send('Erro ao realizar login');
    }
}

module.exports = {
    realizarLogin
}
