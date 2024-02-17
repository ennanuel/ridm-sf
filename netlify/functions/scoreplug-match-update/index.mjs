import axios from "axios";

const webhookHandler = async (event, context) => {
    try {
        console.log(event.body);
        console.log(event);
        // const { time_to_run } = JSON.parse(event.body);
        // console.log(time_to_run);
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