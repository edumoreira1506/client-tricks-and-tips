module.exports = app => {

    const getSession = req => {
    	let session = {
    		logged: req.session.logged,
            username: req.session.username,
            admin: req.session.admin
    	}

    	return session
    }

    return { getSession }
}