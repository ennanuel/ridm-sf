import axios from "axios";

export default function cancelAfterFiveSeconds() {
    return setTimeout(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        source.cancel("Time out!");
    }, 5000);
}