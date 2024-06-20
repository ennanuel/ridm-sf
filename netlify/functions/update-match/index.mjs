import axios from "axios";
import { cancelAfterFiveSeconds } from "../../../utils/cancel";

const requestHandler = async (event) => {
    try {
        const URL = `${process.env.SERVER_URL}/maintenance/update/match`;
        const headers = {
            'auth-token': process.env.AUTH_TOKEN
        };

        const options = { headers };
        
        cancelAfterFiveSeconds();

        await axios.put(URL, {}, options)
            .then(() => console.log("API Call Successful!"))
            .catch((error) => { throw error });
            
        return new Response('Match update started', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default requestHandler;

export const config = {
    path: "/scoreplug/match-update"
};