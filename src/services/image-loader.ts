export function imageLoader (imgUrl: string): string {
	return `https://fedtest.monolith.co.il/api/imager.php?url=${ imgUrl }&type=fit&width=1000&height=1000&quality=70`
}
