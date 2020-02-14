const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

module.exports = {
    async store(req, res){
        const { login, password, email, name, image, position } = req.body;
        if ( !login ) {
            res.status(500).send({error: "Login não informado. Verifique!"});
        }

        if ( !password ) {
            res.status(500).send({error: "Senha não informada. Verifique!"});
        }

        if ( !email ) {
            res.status(500).send({error: "E-mail não informado. Verifique!"});
        }
        //Primeiro verifique se já existe um e-mail cadastrado
        let user = await User.findOne({ where: { email } })
        if ( !user ){
            user = await User.findOne({ where: { login } })
            //Verica se já possui algum usuário com o login informado
            if ( !user ) {
                user = await User.create({ login, password, email, name, image, position });
                await user.save();               
            } else {
                res.status(500).send({error: "Usuário já cadastrado em nosso sistema. Verifique!"});
            }
        } else {
            res.status(500).send({error: "E-mail já cadastrado."});
        }

        return res.json({user});
    },
    async auth(req, res) {

        const { login, password } = req.body;

        let user = await User.findOne({ where: { login } });

        if ( user ) {
            const isValid = await bcrypt.compare(password, user.password);
            if ( isValid ) {
                const token = jwt.sign({id:user.id}, authConfig.secret, {
                    expiresIn: 86400
                })
                user.password = '';
                return res.json({user, token});
            } else {
                res.status(401).send({error: "Senha inválida"})
            }
        } else {
            res.status(401).send({error: "Usuário não existe"})
        }
    },
    async getUserByToken(req, res) {

        const authHeader = req.headers.authorization;

        let userId = '';
        if ( !authHeader ){
            return res.status(401).send({error: 'Não autorizado'});
        }

        const parts = authHeader.split(' ');

        if ( !parts.length === 2 ) {
            return res.status(401).send({error: 'Não autorizado'});
        }
        
        const [ scheme, token ] = parts;

        if ( !/^Bearer$/i.test(scheme)) {
            return res.status(401).send({error: 'Não autorizado'});
        }

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if ( err ) {
                return res.status(401).send({error: 'Não autorizado'});
            }
            userId = decoded.id
        });

        let user = await User.findByPk(userId)

        return res.json({user});
    }
};