import axios from "axios";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const delayForFiveSeconds = () => new Promise((resolve) => setTimeout(resolve, 5000));

const webhookHandler = async (event) => {
    try {
        console.warn("Delaying for five seconds")
        await delayForFiveSeconds();

        axios.post('https://google.com')
            .then(() => console.warn("nothing will happen"))
            .catch((error) => console.error(error.message));
        source.cancel("Request cancelled");
            
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default webhookHandler;

export const config = {
    path: "/match-update"
};