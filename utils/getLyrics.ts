
import axios from "axios";

const BASE_URL = 'https://api.lyrics.ovh/v1';

export default async function getLyrics (songTitle?: string, artistName?: string): Promise<{ lyrics: string }> {
	try {
        if(songTitle && artistName) {
            const { data } = await axios.get(`${BASE_URL}/${artistName}/${songTitle}`);
            return data;
        } else {
            throw new Error('Song has to have a title and artist name');
        }
	} catch (e) {
		throw e;
	}
};