
import axios from "axios";

const BASE_URL = 'https://api.lyrics.ovh/v1';

export default async function getLyrics2 (songTitle?: string, artistName?: string) {
	try {
        if(songTitle && artistName) {
			const url = `${BASE_URL}/${artistName}/${songTitle}`;
            const { data } = await axios.get(url);
            return data;
        } else {
            throw new Error('Song has to have a title and artist name')
        }
	} catch (e) {
		throw e;
	}
};