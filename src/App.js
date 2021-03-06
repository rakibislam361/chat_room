import { ChatEngine } from 'react-chat-engine';
import './App.css';
import ChatFeed from "./components/ChatFeed";
import LoginForm from './components/LoginForm';


const App = () => {

    if(!localStorage.getItem('username')) { 
        return <LoginForm /> 
    }else{
        return (
            <ChatEngine
                height="100vh"
                projectID="9c946fa3-d11b-4514-90c2-29cb05dac580"
                userName={localStorage.getItem('username')}
                userSecret={localStorage.getItem('password') }
                renderChatFeed={(chatAppProps)=> <ChatFeed {...chatAppProps}  />}
            />        
        );
    }
}

export default App;
