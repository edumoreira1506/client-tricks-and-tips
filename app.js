const app = require('./config/server');
const port = 400;

const server = app.listen(port, function(){
	console.log(`Online server on port ${port}`);
});