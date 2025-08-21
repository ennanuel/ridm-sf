import { Options } from "../types";


export function getParamsOutOfUrl(url: string) {
    const params = url
        .replace(/\w+:\/\/((\w|\-|\.)+\/*)+\?/, '')
        .replace(/\?|\&/, ' ')
        .split(' ')
        .map(query => ({ [query.split('=')[0]]: query.split('=')[1] }))
        .reduce((entries, entry) => ({ ...entries, ...entry }), {});

    return params;
};

export function generateGeniusApiOption(songTitle: string, artistName: string): Options {
    return {
        apiKey: String(process.env.GENIUS_CILENT_ACCESS_TOKEN),
        title: songTitle,
        artist: artistName,
        optimizeQuery: true,
        authHeader: true
    };
}