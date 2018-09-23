import Sequelize from 'sequelize'
import db from './db'

const User = db.define('users', {
	id: {
		type: Sequelize.STRING(22),
		primaryKey: true,
	},
	secret: {
		type: Sequelize.STRING(32),
		unique: true,
	},
});

User.getBySecret = async function(secret) {
	return this.findOne({
		where: { secret },
	})
}

export default User
