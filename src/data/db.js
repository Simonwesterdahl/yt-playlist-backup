import Sequelize from 'sequelize'

const sequelize = new Sequelize(
	'playlist-backup',
	'playlist-backup',
	'password',
	{
		host: 'localhost',
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		operatorsAliases: false
	}
);

export default sequelize
