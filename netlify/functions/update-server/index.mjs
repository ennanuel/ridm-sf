import axios from "axios";
import { delayForFiveSeconds } from "../utils/delay";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const webhookHandler = async () => {
    try {
        const URL = `${process.env.SERVER_URL}/maintenance/update/server`;
        const options = {
            headers: {
                'auth-token': process.env.AUTH_TOKEN
            }
        };

        axios.put(URL, options)
            .then(() => console.warn("nothing will happen"))
            .catch((error) => console.error(error.message));
        
        await delayForFiveSeconds();
        
        source.cancel("Request cancelled to avoiding going over runtime limit");

        return new Response('Update Started!', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default webhookHandler;

export const config = {
    schedule: "@daily"
};