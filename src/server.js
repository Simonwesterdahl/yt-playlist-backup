import Hapi from 'hapi'
import good from 'good'
import Boom from 'boom'
import crypto from 'crypto'
import User from './data/user'
import UserVideo from './data/user-video'
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
		const user = await User.getBySecret(secret)
		if (!user) {
			throw Boom.notFound('No user found by secret', secret)
		}

		const video = await backup(request.payload)

		const [userVideo, created] = await UserVideo.findOrCreate({
			where: { userId: user.id, videoId: video.id },
			defaults: { userId: user.id, videoId: video.id },
		})

		if (created) {
			return h.response({ saved: true }).code(201)
		}

		return h.response({ saved: true }).code(200)
	}
})

server.route({
	method: 'POST',
	path: '/user',
	handler: async (request, h) => {
		const { id } = request.payload

		let user = await User.findById(id)
		if (user) {
			throw Boom.badRequest('User already exists', id)
		}

		const secret = await crypto.randomBytes(24)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/\=/g, '')
		user = await User.create({ id, secret })

		return { user }
	}
})

process.on('unhandledRejection', e => {
	server.log(e)
	process.exit(1)
})

init()
