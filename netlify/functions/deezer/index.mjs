import axios from "axios";

async function deezerHandler(req) {
    try {
        const queries = req.url
            .replace(/\w+:\/\/((\w|\-|\.)+\/*)+\?/, '')
            .replace(/\?|\&/, ' ')
            .split(' ')
            .map(query => ({ [query.split('=')[0]]: query.split('=')[1] }))
            .reduce((entries, entry) => ({ ...entries, ...entry }), {});
            
        const { path, ...params } = queries;
        const URL = `${process.env.DEEZER_URL}/${path}`;

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

export default deezerHandler;

export const config = {
    path: "/ridm/music-data"
}