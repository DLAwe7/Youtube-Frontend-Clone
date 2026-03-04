export async function handler(event) {
    const { type, ids } = event.queryStringParameters || {};
    if (!type || !ids) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing parameters" }) };
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;
    if (!API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: "API_KEY is missing" }) };
    }

    let url;
    if (type === "videos") {
        url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${API_KEY}`;

    } else if (type === "channels") {
        url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ids}&key=${API_KEY}`;
    } else {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid type" }) };
    }

    const response = await fetch(url);
    const data = await response.json();

    return { statusCode: 200, body: JSON.stringify(data.items) };
};
