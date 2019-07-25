module.exports = app => {

    const index = (req, res) => {
        res.send('Hello world')
    }

    return { index }
}