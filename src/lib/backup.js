import { getThumbnail } from './youtube'
import imgur from './imgur'

export default async (payload) => {

	return getThumbnail(payload.url)

}
