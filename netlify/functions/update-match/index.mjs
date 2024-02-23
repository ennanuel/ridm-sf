import axios from "axios";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const webhookHandler = async (event) => {
    try {
        const URL = `${process.env.SERVER_URL}/maintenance/update/match`;
        const options = {
            headers: {
                'auth-token': process.env.AUTH_TOKEN
            }
        };
        
        axios.put(URL, options)
            .then(() => console.warn("nothing will happen"))
            .catch((error) => console.error(error.message));
        
        source.cancel("Request cancelled to avoid going over runtime limit");
            
        return new Response('Match update started', { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default webhookHandler;

export const config = {
    path: "/match-update"
};