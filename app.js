import steam from 'steam-user'
import express from 'express'

const port = process?.env?.PORT || 27015
let code

const session = new steam()
const credentials = {
	accountName: process?.env?.accountName,
	password: process?.env?.password,
}
session.on('loggedOn', () => {
	console.log('logged in')
	session.setPersona(1)
	session.gamesPlayed([730])
})

session.on('steamGuard', (domain, callback) => (code ? callback(code) : null))

//API
const app = express()
app.use(express.json())
app.post('/', (req, res) => {
	code = req.body.steam
	console.log('got code: ' + req.body.steam)
	session.logOn(credentials)
	res.send('loggin in')
})

app.listen(port, () => console.log('Escutando na porta ' + port))
