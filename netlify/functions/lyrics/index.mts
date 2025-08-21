import axios from "axios";
import { getParamsOutOfUrl, getSong, generateGeniusApiOption } from "../../../utils";

async function musixMatchHandler(req: Request) {
    let response;

    try {
        console.log(`Request made by: ${req.headers.get('User-Agent')}\n Request content: ${req.url}`);

        const queries = getParamsOutOfUrl(req.url);
        const result = await axios.get(`${process.env.DEEZER_URL}/track/${queries?.songId}`);
        const song = result.data;        
        const options = generateGeniusApiOption(song.title, song.artist?.name);
        const lyrics = await getSong(options);
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