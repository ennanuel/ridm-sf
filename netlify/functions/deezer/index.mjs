import axios from "axios";

async function deezerHandler(req) {
    let response;

    try {
        const queries = req.url
            .replace(/\w+:\/\/((\w|\-|\.)+\/*)+\?/, '')
            .replace(/\?|\&/, ' ')
            .split(' ')
            .map(query => ({ [query.split('=')[0]]: query.split('=')[1] }))
            .reduce((entries, entry) => ({ ...entries, ...entry }), {});
            
        const { path, ...params } = queries;
        const URL = `${process.env.DEEZER_URL}/${path}`;

        const result = await axios.get(URL, { params });
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