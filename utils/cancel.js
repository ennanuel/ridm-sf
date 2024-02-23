import axios from "axios";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const cancelAfterFiveSeconds = () => setTimeout(() => {
    source.cancel("Time out!");
});

export {
    cancelAfterFiveSeconds
}