import axios from "axios";
import { getParamsOutOfUrl } from "./url";

export default async function getDeezerSong(url: string) {
    try {
        const queries = getParamsOutOfUrl(url);
        const { data } = await axios.get(`${process.env.DEEZER_URL}/track/${queries?.songId}`);
        return data;
    } catch (error) {
        throw error;
    }
}