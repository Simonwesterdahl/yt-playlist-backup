import Sequelize from 'sequelize'
import db from './db'
import Channel from './channel'

const Video = db.define('videos', {
	id: {
		type: Sequelize.STRING(11),
		primaryKey: true,
	},
	title: Sequelize.STRING,
	lengthSeconds: Sequelize.STRING(11),
	channelId: {
		type: Sequelize.STRING(24),
		references: {
			model: Channel,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		},
	},
	viewCount: Sequelize.STRING(50),
	author: Sequelize.STRING,
	description: Sequelize.TEXT,
	rating: Sequelize.STRING(50),
	thumbnailUrl: Sequelize.STRING,
	isLiveContent: Sequelize.BOOLEAN,
});

export default Video
