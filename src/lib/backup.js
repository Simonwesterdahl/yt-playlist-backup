import moment from 'moment'
import { getInfo, getThumbnail } from './youtube'
import imgurUpload from './imgur'
import Channel from '../data/channel'
import Video from '../data/video'

export default async payload => {
	const videoInfo = await getInfo(payload.url)

	const thumbnail = await getThumbnail(videoInfo)
	let imageUrl
	if (thumbnail && thumbnail.url) {
		imageUrl = await imgurUpload(thumbnail)
	}

	const { author } = videoInfo
	const [channel] = await Channel.findOrCreate({
		where: { id: videoInfo.author.id },
		defaults: {
			id: author.id,
			name: author.name,
			avatar: author.avatar,
			user: author.user,
			channelUrl: author.channel_url,
			userUrl: author.user_url,
			verified: author.verified,
		},
	})

	const { videoDetails } = videoInfo.player_response
	const [video] = await Video.findOrCreate({
		where: { id: videoInfo.video_id },
		defaults: {
			id: videoInfo.video_id,
			title: videoDetails.title,
			lengthSeconds: videoDetails.lengthSeconds,
			channelId: channel.id,
			viewCount: videoDetails.viewCount,
			author: videoDetails.author,
			description: videoInfo.description,
			rating: videoInfo.avg_rating,
			thumbnailUrl: imageUrl,
			isLiveContent: videoDetails.isLiveContent,
			published: moment(videoInfo.published).toDate(),
		},
	})

	return video
}
