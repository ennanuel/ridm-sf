import axios from "axios";
import { cancelAfterFiveSeconds } from "../../../utils/cancel";

const webhookHandler = async () => {
    try {
        const URL = `${process.env.SERVER_URL}/maintenance/update/server`;
        const headers = new Headers();
        headers.append('auth-token', process.env.AUTH_TOKEN);
        
        const options = { headers };

        cancelAfterFiveSeconds();

        await axios.put(URL, options)
            .then(() => console.warn("nothing will happen"))
            .catch((error) => { throw error });

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