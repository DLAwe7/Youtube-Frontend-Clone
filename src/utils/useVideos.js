import { useQuery } from "@tanstack/react-query";
import { fetchChannel, fetchComments, fetchVideos } from "../utils/videoService";

export const useVideos = (videoIds, options = {}) => {
    return useQuery({
        queryKey: ["videos", videoIds],
        queryFn: () => fetchVideos(videoIds),
        enabled: !!videoIds?.length,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        ...options,
    });
};

export const useChannel = (channelIds, options = {}) => {
    return useQuery({
        queryKey: ["channels", channelIds],
        queryFn: () => fetchChannel(channelIds),
        enabled: !!channelIds?.length,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        ...options,
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