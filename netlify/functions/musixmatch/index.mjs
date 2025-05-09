import axios from "axios";

async function musixMatchHandler(req) {
    let response;

    try {
        console.log(`Request made by: ${req.headers.get('User-Agent')}\n Request content: ${req.url}`);

        const queries = req.url
            .replace(/\w+:\/\/((\w|\-|\.)+\/*)+\?/, '')
            .replace(/\?|\&/, ' ')
            .split(' ')
            .map(query => ({ [query.split('=')[0]]: query.split('=')[1] }))
            .reduce((entries, entry) => ({ ...entries, ...entry }), {});
            
        const { path } = queries;
        const params = { ...queries, apikey: process.env.MUSIXMATCH_API_KEY };

        const URL = `${process.env.MUSIXMATCH_URL}/${path}`;

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

export default musixMatchHandler;

export const config = {
    path: "/lyrics"
};