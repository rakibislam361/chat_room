import React from 'react';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import Profile from './Profile';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'



const ChatFeed = (props) => {

    const formatter = buildFormatter(frenchStrings);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory();
    const logOut = async(e) => {
        e.preventDefault();
        const authObject = {'Project-ID': "9c946fa3-d11b-4514-90c2-29cb05dac580",'User-Name': props.userName, 'User-Secret': props.userSecret }
        
        try {
           await axios.get('https://api.Chatengine.io/chats', {headers : authObject});
            localStorage.setItem('username', '');
            localStorage.setItem('password', '');

            window.location.reload();
        } catch (error) {
           
        }
    
    };


    const { chats, userName, messages, activeChat } = props;
    const chat = chats && chats[activeChat];
    
    const renderReadReceipts = (message, isMyMessage ) =>{
        return chat.people.map((person, index) => person.last_read == message.id && (

            <div
                key= {`read_${index}`}
                className="read-receipt"
                style= {{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person.person.avatar})`
                }}
                
            />
        ))

    } 


    const profileModel = () =>{
        <Profile /> 
    }
    
    const renderMessages =() =>{
        const keys = Object.keys(messages);
        
        return keys.map((key,index) =>{
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index-1];
            const isMyMessage = userName === message.sender_username;
            const messageTime = message.created;
            const messageSender = message.sender_username;
            return (
                <div key={`msg_${index}`} style={{width : '100%'}}>
                     <div className="time"> </div>
                    <div className="message-block">
                        {
                            isMyMessage
                            ?<MyMessage message={message} />
                            :<TheirMessage message={message} username={messageSender} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px': '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    if(!chat) return 'Loading...'

    return (
        <div className="chat-feed">
            <div className="profile-menu">
                <div className="menu-items">     
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MenuIcon /> Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={profileModel}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={logOut}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>

            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) =>` ${person.person.username}`)}
                </div>
            </div>

            {renderMessages()}

            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm {...props } chatId={activeChat} />
            </div>
            
        </div>
    );
}

export default ChatFeed;
