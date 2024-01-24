const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const verificarAutenticacao = (request, response, next) => {
  const token = request.header('Authorization');

  if (!token) {
    console.log('Token ausente');
    return response.status(401).json({ mensagem: 'Acesso não autorizado...' });
  }

  try {
    console.log("token recebido back end: ", token)
    const decoded = jwt.verify(token, secretKey);

    // Se você estiver usando sessão, pode verificar informações nela
    if (request.session && request.session.usuario) {
      const { id_cliente, email } = request.session.usuario;

      // Verifique se as informações do token correspondem às informações da sessão
      if (decoded.userId === id_cliente && decoded.email === email) {
        console.log('Usuário autenticado:', request.usuario);
        next();
      } else {
        console.log('Token inválido - informações não correspondem à sessão');
        return response.status(401).json({ mensagem: 'Token inválido' });
      }
    } else {
      console.log('Sessão ausente ou sem informações de usuário');
      return response.status(401).json({ mensagem: 'Acesso não autorizado...' });
    }
  } catch (erro) {
    console.log('Erro ao verificar o token:', erro);
    return response.status(401).json({ mensagem: 'Token inválido' });
  }
};

module.exports = {
  verificarAutenticacao
};
