import { model, obey, use } from 'modli';
import Boom from 'boom'
import initDb from './db'

initDb()

const VERSION = 1

model.add({
	name: 'user',
	version: VERSION,
	tableName: 'public.user',
	schema: obey.model({
		id: { type: 'string', min: 1, max: 22, required: true },
	})
});

const userModel = use('user', 'postgres')

export { VERSION }

export const getBySecret = async secret => {
	const res = await userModel.read(`secret='${secret}'`)
	console.log(res)
	if (res.length === 0) {
		throw Boom.notFound('No user found by secret', secret)
	}
}

export { userModel }
