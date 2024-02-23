import axios from "axios";

const webhookHandler = async (req, res) => {
    try {
        console.log("This should show daily");

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default webhookHandler;

export const config = {
    schedule: "@daily"
};