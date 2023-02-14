import Express from 'express'
const app = Express()

app.get('/', (req, res) => {
	res.send('Hola Alberto!')
})

app.listen(443, () => {
	console.log('lo escucho Alberto')
})
