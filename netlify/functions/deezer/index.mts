import axios from "axios";
import { getParamsOutOfUrl } from "../../../utils";

async function deezerHandler(req) {
    let response;

    try {
        const queries = getParamsOutOfUrl(req.url);
        const { path, ...params } = queries;
        const url = `${process.env.DEEZER_URL}/${path}`;
        const result = await axios.get(url, { params });
        response = new Response(JSON.stringify(result.data), { status: 200 });
    } catch (error) {
        console.error(error);
        response = new Response(JSON.stringify({ message: error.message }), { status: 500 });
    } finally {
        response.headers.append('Access-Control-Allow-Origin', '*');
        return response;
    }
};

export default deezerHandler;

export const config = {
    path: "/music-data"
}