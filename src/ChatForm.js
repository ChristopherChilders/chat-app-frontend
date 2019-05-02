import React from 'react';


function ChatForm({text, handleChange, handleSend}){
    return (
        <form onSubmit={handleSend}>
            <input value={text} onChange={handleChange}/>
        </form>
        <button onClick={handleSend}>send</button>
    )
}


export default ChatForm;