import * as dotenv from 'dotenv'
import express from 'express'
import message from './messages.js'
dotenv.config()

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
	if (req.headers.authorization !== process.env.PHP_TOKEN) return res.send('no permission')
	paciente_atualizado(req.body)
	res.sendStatus(200)
})

app.get('/webhooks', (req, res) => res.send(req.query['hub.challenge']))

app.post('/webhooks', (req, res) => {
	console.log(req.body.entry[0].changes)
})

function paciente_atualizado(json) {
	const options = {
		doutor: 'Pedro',
		paciente: json?.paciente,
		link: json?.link,
		status: json.status,
	}
	if (json.post_status !== 'publish') return
	if (!options.paciente) return
	message('5532991421477').text(options)
}

app.listen(process.env.PORT || 27015)
