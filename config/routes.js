module.exports = app => {
    app.get('/', app.application.controllers.blog.index)
}