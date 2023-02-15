import express from 'express'
import message from './messages.js'

export default function createRoutes() {
	const app = express()
	app.use(express.json())
	app.listen(process.env.PORT || 27015)
	app.post('/updated', (req, res) => post_updated(req, res))
	app.get('/webhooks', (req, res) => get_webhooks(req, res))
	app.post('/webhooks', (req, res) => post_webhooks(req, res))
}

function get_webhooks(req, res) {
	return res.send(req.query['hub.challenge'])
}

function post_updated(req, res) {
	if (req.headers.authorization !== process.env.PHP_TOKEN) return res.sendCode(101)
	const json = req.body
	const options = {
		doutor: 'Pedro',
		paciente: json?.paciente,
		link: json?.link,
		status: json.status,
	}
	if (json.post_status !== 'publish') return res.sendCode(200)
	if (!options.paciente) return res.sendCode(200)
	message('5532991421477').text(options)
	return res.sendStatus(200)
}

function post_webhooks(req, res) {
	const messages = req?.body?.entry[0]?.changes[0]?.value.messages
	if (!messages) return res.sendStatus(200)
	for (const each of messages) {
		console.log(each)
		message(each.from).text(each.text.body)
	}
	return res.sendStatus(200)
}
