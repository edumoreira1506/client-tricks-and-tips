module.exports = app => {
    app.get('/', app.application.controllers.blog.index)

    app.get('/users', app.application.controllers.users.index)
    
    app.get('/panel', app.application.controllers.panel.index)

    app.get('/login', app.application.controllers.blog.login)
    app.post('/login', app.application.controllers.blog.auth)

    app.get('/exit', app.application.controllers.blog.exit)

    app.get('/register', app.application.controllers.blog.register)
    app.post('/register', app.application.controllers.blog.registerApi)
}