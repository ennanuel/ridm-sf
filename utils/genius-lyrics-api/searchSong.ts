import axios from "axios";
import { checkOptions, getTitle } from "./helpers";

import { type Options } from "../../types";
import { userAgentHeader } from "./headers";

const SEARCH_URL = 'https://api.genius.com/search?q=';


export default async function searchSong (options: Options) {
	try {
		checkOptions(options);
		let { apiKey, title, artist, optimizeQuery = false } = options;
		const song = optimizeQuery ? getTitle(title, artist) : `${title} ${artist}`;
		const reqUrl = `${SEARCH_URL}${encodeURIComponent(song)}`;
		const headers = {
			...userAgentHeader,
			Authorization: `Bearer ${apiKey}`
		};
		let { data } = await axios.get(
			`${reqUrl}&access_token=${apiKey}`,
			{ headers }
		);
		if (data.response.hits.length === 0) return null;
		const results = data.response.hits.map((val) => {
			const { full_title, song_art_image_url, id, url } = val.result;
			return { id, title: full_title, albumArt: song_art_image_url, url };
		});
		return results;
	} catch (e) {
		throw e;
	}
};
