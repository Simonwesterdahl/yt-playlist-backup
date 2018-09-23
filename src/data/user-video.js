import Sequelize from 'sequelize'
import db from './db'
import User from './user'
import Video from './video'

const UserVideo = db.define('users_videos', {
	userId: {
		type: Sequelize.STRING(22),
		primaryKey: true,
		field: 'users_id',
		references: {
			model: User,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		},
	},
	videoId: {
		type: Sequelize.STRING(11),
		primaryKey: true,
		field: 'videos_id',
		references: {
			model: Video,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		},
	},
});

// UserVideo.findByIds = async function(userId, videoId) {
// 	return this.findOne({
// 		where: {
// 			userId,
// 			videoId,
// 		},
// 	})
// }

export default UserVideo
