export async function handler(event) {
    try {
        const { type, ids } = event.queryStringParameters || {};

        if (!type || !ids) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing parameters" }),
            };
        }

        const API_KEY = process.env.YOUTUBE_API_KEY;

        if (!API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "YOUTUBE_API_KEY is missing" }),
            };
        }

        const safeIds = ids
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean)
            .join(",");

        if (!safeIds) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No valid ids provided" }),
            };
        }

        let url;

        if (type === "videos") {
            url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${safeIds}&key=${API_KEY}`;
        } else if (type === "channels") {
            url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${safeIds}&key=${API_KEY}`;
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid type" }),
            };
        }

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: data?.error?.message || "Upstream YouTube API request failed",
                }),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=300",
            },
            body: JSON.stringify(data.items ?? []),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error instanceof Error ? error.message : "Unexpected server error",
            }),
        };
    }
}