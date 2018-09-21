import Hapi from 'hapi'
import good from 'good'
import Boom from 'boom'
import * as user from './data/user'
import backup from './lib/backup'

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
})

const init = async () => {
	try {
		await server.register([{
			plugin: good,
			options: {
				reporters: {
					console: [
						{
							module: 'good-squeeze',
							name: 'Squeeze',
							args: [{
								"response": "*",
								"log": "*",
								"request": "*"
							}],
						},
						{ module: 'good-console' },
						'stdout',
					],
				},
			},
		}])

		// Make sure all 500 errors are logged
		server.ext('onPreResponse', (request, h) => {
			const { response } = request
			if (
				response.output &&
				(
					response.output.statusCode <= 500 ||
					response.output.statusCode >= 400
				)
			) {
				console.error(request.headers)
				console.error(response)
			}
			return h.continue
		})

		await server.start()

		server.log(['debug'], `server running at ${server.info.uri}`)

	} catch (e) {
		console.error(e)
	}
}

server.route({
	method: 'POST',
	path: '/like/{secret}',
	handler: async (request, h) => {

		const { secret } = request.params

		console.log(user)
		await user.getBySecret(secret)

		// return backup(request.payload)

		return {
			logged: true
		}
	}
})

server.route({
	method: 'POST',
	path: '/user',
	handler: async (request, h) => {
		console.log(request.payload)
		const { id } = request.payload
		const res = await user.create({ id })

		return {
			success: true,
			inserted: res,
		}
	}
})

process.on('unhandledRejection', e => {
	server.log(e)
	process.exit(1)
})

init()
