
import { type Options } from "../../types";

import { checkOptions } from "./helpers";
import extractLyrics from "./helpers/extractLyrics";
import searchSong from "./searchSong";


export default async function getLyrics (arg: Options) {
	try {
		if (arg && typeof arg === 'string') {
			let lyrics = await extractLyrics(arg);
			return lyrics;
		} else if (typeof arg === 'object') {
			checkOptions(arg);
			let results = await searchSong(arg);
			if (!results) return null;
			let lyrics = await extractLyrics(results[0].url);
			return lyrics;
		} else {
			throw 'Invalid argument';
		}
	} catch (e) {
		throw e;
	}
};
