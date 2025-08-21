
import axios from "axios";
import { load as cheerioLoad } from "cheerio";


const BASE_URL = 'https://www.azlyrics.com';
const SEARCH_TEXT = 'Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that.';
const HEADERS = {
	'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
};


export default async function getLyrics2 (songTitle?: string, artistName?: string) {
	try {
        if(songTitle && artistName) {
            const artist = removeNonAlphabets(artistName);
            const song = removeNonAlphabets(songTitle);
            const url = `${BASE_URL}/lyrics/${artist}/${song}.html`;

            const { data } = await axios.get(url, { headers: HEADERS });
            const lyrDat = selectElementByCommentContent(data, SEARCH_TEXT);
            return lyrDat.toString();
        } else {
            throw new Error('Song has to have a title and artist name')
        }
	} catch (e) {
		throw e;
	}
};


function removeNonAlphabets(value: string): string {
    return value
		.toLowerCase()
        .replace(/[^a-z]/ig, '')
        .trim();
}

function selectElementByCommentContent(content: any, commentContent: string): string {
	let lyrics = "";

	const $ = cheerioLoad(content);

	$('div').each((_, element) => {
		$(element).contents().each((_, node) => {
			if (node.type === 'comment' && node.data.includes(commentContent)) {
				const elementHTML = $(element).html();
                if(elementHTML) {
					let snippet = elementHTML
						.replace(/<br>/g, '\n')
                        .replace(/(^" *| "$)/g, '')
						.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
					lyrics += snippet;
                }
				return false;
			}
		});
		if (lyrics) return false;
	});
	return lyrics;
}
