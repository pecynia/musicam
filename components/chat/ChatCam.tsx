import React from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';

import { FunctionComponent, useEffect, useState} from "react";

interface ChatCamProps {
    id: number;
}

export const ChatCam: FunctionComponent<ChatCamProps> = (props: ChatCamProps) => {
    const [message, setMessage] = useState("");
    
    // Get message gets updates for messages for the id of the user. After 5 seconds the message disappears.
    const getMessage = () => {
        let id = props.id;
        onValue(ref(getDatabase(), 'messages/' + id), (snapshot) => {
            let message = snapshot.val();
            setMessage(message);

            // After 5 seconds the message disappears.
            setTimeout(() => {
                setMessage("");
            }, 5000);
        });        
    }

    useEffect(() => {
        getMessage();
    }, []);

    return (
            <div className=''>
                {Object.entries(message).map(([key, value]) => (
                    value.length > 0 ? 
                    <div className='pl-5 pr-5 pt-10' key={key}>
                        <div className='text-center'>
                            <p className='pl-5 py-1 font-bold text-lg  bg-yellow-400 text-blue-800 '>
                                {value.length > 80 ? value.substring(0, 80) + "..." : value}
                            </p>

                            {/* Create the loader bar that goes up to five seconds and then disappears, that slowly goes from left to right */}
                            <svg className="animate-pulse" width="100%" height="20" viewBox="0 10 100 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <rect x="0" y="0" width="100" height="20" fill="blue">
                                    <animate attributeName="width" from="0" to="100" dur="5s" repeatCount="1" />
                                </rect>
                            </svg>            
                        </div>
                    </div>
                    : null
                ))}           
            </div>
    );
};

export default ChatCam
