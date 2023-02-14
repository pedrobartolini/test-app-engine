import { Express } from 'express'
const app = Express()

app.get('/', (req, res) => {
	res.send('Hellow world!')
})

app.listen(443)
