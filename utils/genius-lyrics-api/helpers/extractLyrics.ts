import axios from "axios";
import { load as cheerioLoad} from "cheerio";
import { userAgentHeader } from "../headers";


export default async function extractLyrics (url) {
	try {
		let headers = { ...userAgentHeader };
		let { data } = await axios.get(url, { headers });
		const $ = cheerioLoad(data);
		let lyrics = $('div[class="lyrics"]').text().trim();
		if (!lyrics) {
			lyrics = '';
			$('div[class^="Lyrics__Container"]').each((_, elem) => {
				const elementHTML = $(elem).html();
				if (elementHTML) {
					let snippet = elementHTML
						.replace(/<br>/g, '\n')
						.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
					lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
				}
			});
		}
		if (!lyrics) return null;
		return lyrics.trim();
	} catch (e) {
		throw e;
	}
};
