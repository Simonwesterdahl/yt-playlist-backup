import imgur from 'imgur'

imgur.setAPIUrl('https://api.imgur.com/3/')

export default async thumbnail => {
	const json = await imgur.uploadUrl(thumbnail.url)
	return json.data.link
}
