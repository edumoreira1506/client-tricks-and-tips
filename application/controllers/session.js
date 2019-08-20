module.exports = app => {

    const getSession = req => {
    	let session = {
    		logged: req.session.logged,
            username: req.session.username,
            admin: req.session.admin,
            userImage: req.session.userImage,
        }
    
    	return session
    }

    return { getSession }
}