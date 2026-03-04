export const fetchVideos = async (videoIds) => {
    if (!videoIds?.length) return [];

    const ids = videoIds.join(",");
    const baseURL = window.location.origin + '/.netlify/functions/youtube';
    const response = await fetch(`${baseURL}?type=videos&ids=${ids}`);

    if (!response.ok) throw new Error("Failed to fetch videos");

    const data = await response.json();
    return data;
};

export const fetchChannel = async (channelIds) => {
    if (!channelIds?.length) return [];

    const ids = channelIds.join(",");
    const baseURL = window.location.origin + '/.netlify/functions/youtube';
    const response = await fetch(`${baseURL}?type=channels&ids=${ids}`);

    if (!response.ok) throw new Error("Failed to fetch channels");

    const data = await response.json();
    return data;
};

export const fetchComments = async () => {
    const baseURL = window.location.origin + '/assets/user-comments.json';
    const response = await fetch(baseURL);

    if (!response.ok) throw new Error("Failed to fetch comments");

    const data = await response.json();
    return data;
};
