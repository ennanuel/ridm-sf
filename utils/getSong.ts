import axios from "axios";
import { getParamsOutOfUrl } from "./url";

export default async function getDeezerSong(url: string) {
    try {
        const queries = getParamsOutOfUrl(url);
        const { data } = await axios.get(`${process.env.DEEZER_URL}/track/${queries?.songId}`);
        if (!data) throw { message: "Could not find song", statusCode: 404 };
        return data;
    } catch (error) {
        throw error;
    }
}