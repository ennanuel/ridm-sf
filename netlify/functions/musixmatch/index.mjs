import axios from "axios";

async function musixMatchHandler(req) {
    try {
        const queries = req.url
            .replace(/\w+:\/\/((\w|\-|\.)+\/*)+\?/, '')
            .replace(/\?|\&/, ' ')
            .split(' ')
            .map(query => ({ [query.split('=')[0]]: query.split('=')[1] }))
            .reduce((entries, entry) => ({ ...entries, ...entry }), {});
            
        const { path } = queries;
        const params = { ...queries, apikey: process.env.MUSIXMATCH_API_KEY };

        const URL = `${process.env.MUSIXMATCH_URL}/${path}`;

        const response = await axios.get(URL, { params });
        
        return Response.json(
            response.data,
            {
                status: 200,
                headers: { 'Access-Control-Allow-Origin': '*' }
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default musixMatchHandler;

export const config = {
    path: "/ridm/lyrics"
};