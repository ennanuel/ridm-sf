import axios from "axios";

async function deezerHandler(req) {
    try {
        const url = req.url;
        const pathname = new URL(req.url).searchParams.get('url');
        const queryString = url.replace(/(https|http):\/\/(\w|.)+app\/api\/deezer(\/)*/, '');
        return new Response(pathname, { status: 200 });

        const { path } = req.query;

        const URL = `${process.env.DEEZER_URL}${path}`;

        const response = await axios.get(URL, { params });

        console.log("API call successful!");
        
        return {
            body: response.data,
            statusCode: 200
        }
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default deezerHandler;

export const config = {
    path: "/api/deezer"
};