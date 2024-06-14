import axios from "axios";

async function deezerHandler(req) {
    try {
        const url = req.url;
        const queryString = url.replace(/(https|http):\/\/(\w|.)+app\/api\/deezer(\/)*/, '').split(/(\?|\&)/).map(query => query.split('='));
        const queries = queryString.map(([key, entry]) => ({ [key]: entry })).reduce((entries, entry) => ({ ...entries, ...entry }), {});

        const { path, ...params } = queries;
        const URL = `${process.env.DEEZER_URL}/${path}`;

        const response = await axios.get(URL, { params });

        console.log("API call successful!");
        
        return new Response(JSON.stringify(response.data), 200);
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default deezerHandler;

export const config = {
    path: "/api/deezer"
};