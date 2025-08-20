import axios from "axios";
import { getParamsOutOfUrl } from "../../../utils/url";

async function musixMatchHandler(req) {
    let response;

    try {
        console.log(`Request made by: ${req.headers.get('User-Agent')}\n Request content: ${req.url}`);

        const queries = getParamsOutOfUrl(req.url);        
        
        const URL = `${process.env.DEEZER_URL}/track/${queries?.songId}`;
        const result = await axios.get(URL);
        const song = result.data;

        const options = {
            apiKey: process.env.GENIUS_CILENT_ACCESS_TOKEN,
            title: song.title,
            artist: song.artist.name,
            optimizeQuery: true
        };

        const lyrics = await getLyrics(options);

        response = new Response(JSON.stringify(lyrics), { status: 200 });
    } catch (error) {
        console.error(error);
        response = new Response(JSON.stringify({ message: error.message }), { status: 500 });
    } finally {
        response.headers.append('Access-Control-Allow-Origin', '*');
        return response;
    }
};

export default musixMatchHandler;

export const config = {
    path: "/lyrics"
};