import { useQuery } from "@tanstack/react-query";
import { fetchChannel, fetchComments, fetchVideos } from "../utils/videoService";


export const useVideos = (videoIds, options = {}) => {
    return useQuery({
        queryKey: ["videos", videoIds],
        queryFn: () => fetchVideos(videoIds),
        enabled: !!videoIds?.length,
        ...options,
    });
};


export const useChannel = (channelId) => {
    return useQuery({
        queryKey: ["channel", channelId],
        queryFn: () => fetchChannel(channelId),
        enabled: !!channelId,
    });
};


export const useComments = () => {

    return useQuery({
        queryKey: ["comments"],
        queryFn: fetchComments,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: 0,
    });

};