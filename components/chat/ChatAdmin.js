import React from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import { writeMessage, getCamName, getActiveCamNodeIds, getNodeToId, getActiveCamNames } from "../databaseConnection"

// This is the main component for the chat, used by the admin. It takes the size of the container, which it takes from the window. 
// It also takes the names of the users, and the ids of the users. The admin can select to whom they want to send a message by clicking on the name.
// then the admin can type a message and send it to the selected user. The message gets send to the database using 'writeMessage', which
// takes a cam id and a message as parameters. The cam id is the id of the user the admin wants to send the message to. 
// The admin can also select to send a message to all users. In that case it loops through all the ids and sends the message to each of them.

export class ChatAdmin extends React.Component{
    constructor(){
        super()
        this.state = {
            ids: [],
            names: [],
            selectedId: null,
            message: ""
        }
    }

    // Get all active user ids by calling getActiveCamNodeIds and parsing the results in getNodeToId, adding to the list of ids.
    getActiveIds(){
        // First get all asynchronous data, this will be available in the next load step of the component.
        let activeIds = getActiveCamNodeIds();
        let names = getActiveCamNames();

        // Then parse the data
        let ids = [];
        activeIds.forEach(id => {
            ids.push(getNodeToId(id));
        });

        // Set the state
        this.setState({
            ids: ids,
            names: names
        });
    }

    // When there is an update in the camera database, the component will update.
    componentDidMount(){
        // Update the active ids if there is a change in the camera database
        onValue(ref(getDatabase(), 'cameras'), (snapshot) => {
            this.getActiveIds();
        });
        // Update the active ids if there is a change in the name database
        onValue(ref(getDatabase(), 'names'), (snapshot) => {
            this.getActiveIds();
        }
        );
    }

    render(){
        return(
            <div className=''> 
                <div className='pt-2 pl-5 pr-5'>
                    <div className=''>
                        <h3 className='pl-5 py-1 font-bold text-lg  bg-yellow-300 text-blue-800 rounded-2xl'>
                            Chat Admin
                        </h3>
                    </div>
                </div>
                
                {/* Select user box */}
                <div className='mx-5 bg-yellow-200 rounded-2xl mt-2 text-blue-800 '>
                    <div className='pt-2'>
                        <h3 className='pl-5 pb-2'>
                            Select user to send message to:
                        </h3>
                    </div>
                    
                    {/* Select user button, show name if there is a name connected to the id */}
                    {this.state.names.map((id, index) => (
                        <div className='pl-5' key={index}>
                            {/* If the id is selected, show a different style, else show the default style. When clicked, change the selected id */}
                            <button className={this.state.selectedId === id['name'] ? 'bg-blue-800 text-yellow-200 rounded-2xl p-2 m-2' : 'bg-yellow-300 text-blue-800 rounded-2xl p-2 m-2'} 
                            onClick={() => this.state.selectedId === id['name'] ? this.setState({selectedId: null}) : this.setState({selectedId: id['name']})}>
                                {id['name']}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Message box and button to send to user below the message box */}
                <div className='mx-5 bg-yellow-200 rounded-2xl mt-2 text-blue-800'>
                    <div className='pt-2'>
                        <h3 className='pl-5 '>
                            Message:
                        </h3>

                        {/* Message field */}
                        <div className='pl-5 pt-2 -mr-3'>
                            <textarea className='rounded-2xl p-2 w-5/6 h-20 ' value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}/>
                        </div>

                        {/* Button, if no user is selected, it sends to all users. If a user is selected, send to that user */}
                        <div className='pl-3'>
                            <button id='message_button' className='bg-blue-600 font-bold text-yellow-200 rounded-2xl p-2 m-2 mb-4' 
                                onClick={() => {
                                    // Button animation
                                    document.getElementById('message_button').style.backgroundColor = 'green';
                                    document.getElementById('message_button').style.color = 'white';
                                    
                                    // Wait 500ms and change the button back to normal
                                    setTimeout(() => {
                                        document.getElementById('message_button').style.backgroundColor = 'blue';
                                        document.getElementById('message_button').style.color = 'yellow';
                                    }, 500);
                                    
                                    // Button id logic. If no user is selected, send to all users. If a user is selected, send to that user.
                                    if(this.state.selectedId === null){
                                        this.state.names.forEach(id => {
                                            writeMessage(id['name'], this.state.message);
                                        });
                                        this.setState({message: ""})
                                    } else {
                                        writeMessage(this.state.selectedId, this.state.message);
                                        this.setState({message: ""})
                                    }
                                }}>
                                Send message
                            </button>
                        </div>                        
                    </div>
                </div>

            </div>
        )
    }
}






export default ChatAdmin