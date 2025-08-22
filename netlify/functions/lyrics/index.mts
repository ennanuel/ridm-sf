
import { getLyrics, getDeezerSong } from "../../../utils";


async function musixMatchHandler(req: Request) {
    let response: Response;

    try {
        console.log(`Request made by: ${req.headers.get('User-Agent')}\n Request content: ${req.url}`);
        const song = await getDeezerSong(req.url);
        const lyrics = await getLyrics(song.title, song.artist.name);
        response = new Response(JSON.stringify(lyrics), { status: 200 });
    } catch (error) {
        console.error(error);
        response = new Response(
            JSON.stringify({ message: error.message }), 
            { status: error?.statusCode || 500 }
        );
    }

    response.headers.append('Access-Control-Allow-Origin', '*');
    return response;
};

export default musixMatchHandler;

export const config = {
    path: "/lyrics"
};