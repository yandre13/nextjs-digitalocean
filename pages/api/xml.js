import Cors from 'cors'
import {generateXmlFile, VALID_NAMES} from 'lib/gen-xml'

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, result => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}

async function handler(req, res) {
	// Run the middleware
	await runMiddleware(req, res, cors)
	generateXmlFile(VALID_NAMES[0])
	generateXmlFile(VALID_NAMES[1])
	res.json({message: 'Xml files updated!'})
}

export default handler
