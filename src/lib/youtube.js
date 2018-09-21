import * as ytdl from 'ytdl-core'
import { maxBy } from 'lodash'

export const getThumbnail = async url => {
	const info = await ytdl.getInfo(url)
	console.log(info)
	const { thumbnails } = info.player_response.videoDetails.thumbnail.thumbnails

	const thumbnail = maxBy(thumbnails, thumbnail => thumbnail.height)

	return thumbnail
}
