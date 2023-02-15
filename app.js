import * as dotenv from 'dotenv'
import createRoutes from './routes.js'
dotenv.config()

try {
	createRoutes()
} catch (err) {
	throw err
}
