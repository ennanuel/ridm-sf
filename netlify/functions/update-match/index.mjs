import axios from "axios";
import { cancelAfterFiveSeconds } from "../../../utils/cancel";

const webhookHandler = async (event) => {
    try {
        const URL = `${process.env.SERVER_URL}/maintenance/update/match`;
        const headers = new Headers();
        headers.append('auth-token', process.env.AUTH_TOKEN);
        
        const options = { headers };
        
        cancelAfterFiveSeconds();

        await axios.put(URL, options)
            .then(() => console.log("API Call Successful!"))
            .catch((error) => { throw error });
            
        return new Response('Match update started', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default webhookHandler;

export const config = {
    path: "/match-update"
};