import axios from "axios";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const delayForFiveSeconds = () => new Promise((resolve) => setTimeout(resolve, 5000));

const webhookHandler = async (event) => {
    try {
        const requestBody = await event.json();
        // const { timeToRun } = requestBody;
        const timeToRun = Date.now() + 60000;
        const timeRemaining = timeToRun - Date.now();
        console.log(timeRemaining);

        if (timeRemaining > 0) {
            console.warn("Delaying for five seconds")
            await delayForFiveSeconds();

            axios.post('https://scoreplug-webhook.netlify.app/match-update', { timeToRun })
                .then(() => console.warn("nothing will happen"))
                .catch((error) => console.error("Request cancelled!"));
            source.cancel("Request cancelled");
            
            return new Response(`Called the function again ${timeRemaining} milliseconds remaining`, { status: 200 });
        }
        console.log("There won't be any delays");

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