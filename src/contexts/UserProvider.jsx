import { UserContext } from "./UserContext";
import { useChannel } from "../utils/useVideos";


export function UserProvider({ children, defaultChannelId }) {
    const { data: channelArray, isLoading, error } = useChannel(
        defaultChannelId ? [defaultChannelId] : [],
        { enabled: !!defaultChannelId }
    );

    const channel = channelArray?.[0] ?? null; // 👈 normalize here

    return (
        <UserContext.Provider value={{ data: channel, isLoading, error }}>
            {children}
        </UserContext.Provider>
    );
}