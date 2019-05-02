import React from 'react';


function ChatForm({text, handleChange, handleSend}){
    return (
        <form onSubmit={(e) => {e.preventDefault(); handleSend();}}>
            <input value={text} onChange={handleChange} />
            <button>send</button>
        </form>
    )
}


export default ChatForm;