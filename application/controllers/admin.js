const axios = require('axios')

module.exports = app => {

    const panel = (req, res) => {
        if(req.session.admin){
            res.send('chegou')
        }else{
            res.redirect('/')
        }
    }

    return { panel }
}