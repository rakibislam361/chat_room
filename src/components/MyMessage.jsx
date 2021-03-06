import React from 'react';

const MyMessage = ({ message }) => {
    if (message?.attachments?.length > 0) {
        return(
            <img 
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{float:'right'}}
            />
        )
    }

    return (
        <React.Fragment>
            <div className="username">
            </div>
            <div className="message" style={{ float:'right', marginRight:'18px', color:'white', backgroundColor:'#3B2A50', marginTop:'-20px' }}>
                {message.text}
            </div>   
        </React.Fragment>
             
    );
}

export default MyMessage;
