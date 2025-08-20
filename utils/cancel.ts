import axios from "axios";

const cancelAfterFiveSeconds = () => setTimeout(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    source.cancel("Time out!");
}, 5000);

export {
    cancelAfterFiveSeconds
};