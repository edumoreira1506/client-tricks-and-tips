const axios = require('axios')
const formidable = require('formidable')
const FormData = require('form-data');

module.exports = app => {

    const index = (req, res) => {
        let data = {
            scripts: [],
            title: 'Home',
            logged: req.session.logged,
            username: req.session.username,
            admin: req.session.admin
        }

        res.render('blog/index', data)
    }

    const login = (req, res) => {
        if (req.session.logged) {
            res.redirect('/')
        } else {
            let data = {
                scripts: ['login'],
                title: 'Login',
                logged: req.session.logged,
                username: req.session.username,
                admin: req.session.admin
            }

            res.render('login/index', data)
        }
    }

    const register = (req, res) => {
        if (req.session.logged) {
            res.redirect('/')
        } else {
            let data = {
                scripts: ['register'],
                title: 'Registro',
                logged: req.session.logged,
                username: req.session.username,
                admin: req.session.admin
            }

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

            form.parse(req);

            form.parse(req, function(err, fields, files) {
                let fd = new FormData();

                fd.append('username', fields.username);
                fd.append('password', fields.password);
                fd.append('confirmPassword', fields.confirmPassword);
                fd.append('email', fields.email);
                fd.append('bornDate', fields.bornDate);
                fd.append('description', fields.description);

                const config = {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
                    }
                }

                axios.post(`http://localhost:3000/user`, fd, config)
                    .then((serverResponse) => {
                        res.send(serverResponse.data)
                    })
                    .catch((error) => {
                        res.send(error)
                    })
                console.log(fields)
                console.log(files)
            });
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