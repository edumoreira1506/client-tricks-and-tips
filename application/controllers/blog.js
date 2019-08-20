const axios = require('axios')
const formidable = require('formidable')
const FormData = require('form-data');

module.exports = app => {

    const index = (req, res) => {
        let data = app.application.controllers.session.getSession(req)

        data.scripts = []
        data.title = 'Home'

        res.render('blog/index', data)
    }

    const login = (req, res) => {
        if (req.session.logged) {
            res.redirect('/')
        } else {
            let data = app.application.controllers.session.getSession(req)

            data.scripts = ['login']
            data.title = 'Login'

            res.render('login/index', data)
        }
    }

    const register = (req, res) => {
        if (req.session.logged) {
            res.redirect('/')
        } else {
            let data = app.application.controllers.session.getSession(req)

            data.scripts = ['register']
            data.title = 'Registro'

            res.render('register/index', data)
        }
    }

    const registerApi = (req, res) => {
        if (req.session.logged) {
            let response = {
                status: false,
                message: 'Você já está logado'
            }
        } else {
            let form = new formidable.IncomingForm(); 
            let user = {}          

            form.parse(req, function(err, fields, files) {
                user.username = fields.username
                user.password = fields.password
                user.confirmPassword = fields.confirmPassword
                user.email = fields.email
                user.bornDate = fields.bornDate
                user.description = fields.description                    
            });

            form.on('fileBegin', function (name, file){
                if(file.name.endsWith('png') || file.name.endsWith('jpeg') || file.name.endsWith('jpg') || file.name.endsWith('gif')){
                    let archiveName = Date.now() + file.name;
                    file.path = `application/public/resources/images/users-perfil/${archiveName}`;
                    user.imagePath = archiveName
                }
            });

            setTimeout(function(){
                axios.post(`http://localhost:3000/user`, user)
                .then((serverResponse) => {
                    res.send(serverResponse.data)
                })
                .catch((error) => {
                    res.send(error)
                })
            }, 1000)
        }
    }

    const auth = (req, res) => {
        if (req.session.logged) {
            let response = {
                status: false,
                message: 'Você já está logado'
            }
        } else {
            if (!req.body.username || !req.body.password) {
                let response = {
                    status: false,
                    message: 'Nome de usuário ou senha inválidos!'
                }

                res.send(response)
            } else {
                axios.post(`http://localhost:3000/auth`, req.body)
                    .then((serverResponse) => {
                        if (serverResponse.data.status) {
                            req.session.logged = true;
                            req.session.token = serverResponse.data.token;
                            req.session.username = serverResponse.data.username;
                            req.session.admin = serverResponse.data.admin;
                            req.session.userImage = serverResponse.data.userImage;
                        }

                        res.send(serverResponse.data)
                    })
                    .catch((error) => {
                        res.send(error)
                    })
            }
        }
    }

    const exit = (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }

    return { index, login, auth, exit, register, registerApi }
}