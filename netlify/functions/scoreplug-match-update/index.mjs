import axios from "axios";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

function getTimesToMakeCall(time, numberOfSecondsInMilliSeconds = 5000) {
    const timetoEndCall = (new Date(time)).getTime();
    const currentTime = Date.now();
    if (currentTime <= timetoEndCall) return 0;
    const timeRemainingInMilliseconds = timetoEndCall - currentTime;
    const timesToMakeCall = Math.ceil(timeRemainingInMilliseconds / numberOfSecondsInMilliSeconds);
    return timesToMakeCall;
}

const webhookHandler = async (event, context) => {
    try {
        const requestBody = await event.json();
        const { timeToRun, timesCalled } = requestBody;
        let timesToMakeCall = 0;
        console.log()

        if (!timesCalled && !timeToRun) return new Response({ message: "nothing to do" }, { status: 200 });
        else if (timeToRun && !timesCalled) timesToMakeCall = getTimesToMakeCall(timeToRun);
        else timesToMakeCall = timesCalled;

        timesToMakeCall--
        axios.post('/match-update', { timeToRun, timesCalled: timesToMakeCall });
        source.cancel("Request cancelled");

        return new Response({ message: `called again: ${timesToMakeCall} times`}, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default webhookHandler;

export const config = {
    path: "/match-update"
};