import * as ytdl from 'ytdl-core'
import { maxBy } from 'lodash'

export const getInfo = url => {
	return ytdl.getInfo(url)
}

export const getThumbnail = async info => {
	const { thumbnails } = info.player_response.videoDetails.thumbnail
	const thumbnail = maxBy(thumbnails, thumbnail => thumbnail.height)
	return thumbnail
}
