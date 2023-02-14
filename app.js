import steam from 'steam-user'
import express from 'express'

const port = process?.env?.PORT || 27015
const credentials = {
	accountName: process?.env?.accountName,
	password: process?.env?.password,
}

let code, games, isOnline

const session = new steam()

session.on('steamGuard', (domain, callback) => callback(code))
session.on('loggedOn', () => {
	isOnline = 1
	console.log('Logged in, playing games..')
	session.setPersona(1)
	session.gamesPlayed(games)
})

session.on('disconnected', () => {
	console.log('Disconnected')
})

//API
const app = express()
app.use(express.json())
app.post('/', (req, res) => {
	code, (games = '')
	code = req.body.steam
	games = req.body.games
	res.send('Success')
	if (!(code && games)) return
	if (!isOnline) return session.logOn(credentials)
	session.gamesPlayed(games)
})

app.listen(port, () => console.log('Escutando na porta ' + port))
