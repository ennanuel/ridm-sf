

export function getParamsOutOfUrl(url) {
    const params = url
        .replace(/\w+:\/\/((\w|\-|\.)+\/*)+\?/, '')
        .replace(/\?|\&/, ' ')
        .split(' ')
        .map(query => ({ [query.split('=')[0]]: query.split('=')[1] }))
        .reduce((entries, entry) => ({ ...entries, ...entry }), {});

    return params;
}