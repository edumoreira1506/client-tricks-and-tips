module.exports = app => {

    const index = (req, res) => {
        if(req.session.admin){
            let data = app.application.controllers.session.getSession(req)

            data.scripts = ['users']

            res.render('users/index', data)
        }else{
            res.redirect('/')
        }
    }

    return { index }
}