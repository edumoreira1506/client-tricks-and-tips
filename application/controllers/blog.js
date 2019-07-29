const axios = require('axios')

module.exports = app => {

    const index = (req, res) => {
        let data = {
            scripts: [],
            title: 'Home',
            logged: req.session.logged,
            username: req.session.username
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
                username: req.session.username
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
                username: req.session.username
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
            axios.post(`http://localhost:3000/user`, req.body)
                .then((serverResponse) => {
                    res.send(serverResponse.data)
                })
                .catch((error) => {
                    res.send(error)
                })
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