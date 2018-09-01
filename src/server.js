const Hapi = require('hapi')
const good = require('good')

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
			if (response.output && response.output.statusCode === 500) {
				console.error(response)
			}
			if (response.output && response.output.statusCode === 400) {
				console.error(request)
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
	method: '*',
	path: '/',
	handler: (request, h) => {

		console.log(request)

		return {
			logged: true
		}
	}
});

process.on('unhandledRejection', e => {
	server.log(e)
	process.exit(1)
})

init()
