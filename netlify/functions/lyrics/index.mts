import axios from "axios";
import { getLyrics, getParamsOutOfUrl } from "../../../utils";


async function musixMatchHandler(req: Request) {
    let response;

    try {
        console.log(`Request made by: ${req.headers.get('User-Agent')}\n Request content: ${req.url}`);

        const queries = getParamsOutOfUrl(req.url);
        const result = await axios.get(`${process.env.DEEZER_URL}/track/${queries?.songId}`);
        const song = result.data;        
        const lyrics = await getLyrics(song?.title, song?.artist?.name);
        response = new Response(JSON.stringify({ data: lyrics }), { status: 200 });
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