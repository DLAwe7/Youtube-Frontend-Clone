import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCount } from '../utils/formatters';


function Channel({ channel, tabIndex }) {



    return <div className='channel-info'>


        {channel && <a tabIndex={tabIndex} className='channel-image-container' href={`https://www.youtube.com/channel/${channel.id}`} target='_blank'><img className="user-temp-img" src={channel?.snippet?.thumbnails?.default?.url} alt={channel?.snippet?.title} /> </a>}

        <div className="channel-name">

            {channel && <a href={`https://www.youtube.com/channel/${channel.id}`} target='_blank' tabIndex={tabIndex}>{channel?.snippet?.title} <FontAwesomeIcon icon={faCircleCheck} /></a>}

            <span className='followers-count'>{formatCount(channel?.statistics?.subscriberCount)} subscribers</span>

        </div>

    </div>

}

export default Channel