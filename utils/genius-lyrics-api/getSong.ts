
import { type Options } from "../../types";

import { checkOptions } from "./helpers";
import extractLyrics from "./helpers/extractLyrics";
import searchSong from "./searchSong";


export default async function getSong (options: Options) {
	try {
		checkOptions(options);
		let results = await searchSong(options);
		if (!results) return null;
		let lyrics = await extractLyrics(results[0].url);
		return {
			id: results[0].id,
			title: results[0].title,
			url: results[0].url,
			lyrics,
			albumArt: results[0].albumArt
		};
	} catch (e) {
		throw e;
	}
};
