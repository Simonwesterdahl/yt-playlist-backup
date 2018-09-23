import Sequelize from 'sequelize'
import db from './db'

const Channel = db.define('channels', {
	id: {
		type: Sequelize.STRING(24),
		primaryKey: true
	},
	name: Sequelize.STRING,
	avatar: Sequelize.STRING,
	user: Sequelize.STRING,
	channelUrl: Sequelize.STRING,
	userUrl: Sequelize.STRING,
	verified: Sequelize.BOOLEAN,
});

export default Channel
