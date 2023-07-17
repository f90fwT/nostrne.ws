const cacheUrl = "https://cache.nostrne.ws";

async function get (page: number, sort: string) {
    const response = await fetch(`${cacheUrl}/?sort=${sort}&page=${page}`);
    const responseJson = await response.json();
    if (responseJson) {
        if (responseJson.message) {
            if (responseJson.message === "OK") {
                return responseJson;
            } else {
                return {error: "Something went wrong...."}
            }
        } else {
            return {error: "Something went wrong...."}
        }
    } else {
        return {error: "Something went wrong...."}
    }
}

export const cache = {
    get,
}