import Express from 'express'
const app = Express()

const port = process.env.PORT || 3001

app.get('/', (req, res) => {
	res.send('Hola Alberto!')
})

app.listen(port, () => {
	console.log('lo escucho Alberto')
})
