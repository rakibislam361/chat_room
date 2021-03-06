import React from 'react';
import profile from '../images/user.jpg'

const TheirMessage = ({ lastMessage, message, username}) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender_username !== message.sender_username;
    return (
        <React.Fragment>
             <div className="username">
                {username}
            </div>
            <div className="message-row">            
            {isFirstMessageByUser && (
                <div 
                    className="message-avatar"
                    style={{ backgroundImage: message.sender_avatar !== null ? `url(${message.sender_avatar})`: `url(${profile})` }}                
                />
            )}

            {message.attachments.length > 0
                ? (
                    <img 
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        style={{marginLeft:isFirstMessageByUser ? '4px' : '48px'}}
                    />
                ) : (
                    <div className="message" style={{ float:'left', backgroundColor:'#CABCDC', marginLeft:isFirstMessageByUser ? '4px' : '48px' }}>
                        {message.text}
                    </div>
                ) 
            }
        </div>
    
        </React.Fragment>
    );
}

export default TheirMessage;
