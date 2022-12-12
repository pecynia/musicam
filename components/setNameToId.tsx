import { useState, useEffect } from "react";
import  {Wrapper} from "./graphicals/WrapperStageComp"
import { writeCamName, getAdminActive, getNodeToId } from "./databaseConnection"
import {ChatCam} from "./chat/ChatCam"




export const SetNameToId = () => {
    const [name, setName] = useState('')                // name of the camera
    const [id, setId] = useState(0)                    // id of the camera
    const [idComplete, setIdComplete] = useState(false) // whether the id has been set
    const [adminActive, setAdminActive] = useState(getAdminActive()) // whether the admin is active

    const handleSubmit = (e: any) => {
        // if submit button is clicked, but no id is been set yet do not continue
        if (id === 0) {
            e.preventDefault()
            setIdComplete(false);
        } else {
            e.preventDefault()
            // set the name to the id in the database
            // if the cam name is '' give it the name id
            if (name === '') {
                writeCamName(id.toString(), id)
            } else {
                writeCamName(name, id)
            }
            setIdComplete(true);
        }
    }

    // Always automatically update the adminactive state when the adminactive state changes in the database, use useEffect
    useEffect(() => {
        setAdminActive(getAdminActive());
    }, []);

    
    // There needs to be an admin active, before the cameras can start logging in
    if (idComplete === false) {
        // Set name form, including all text containers and styling
        return (
            <div>
                <div className='pt-7 pb-10 px-10'>
                    <div className='max-w-3xl mx-auto bg-yellow-300 rounded-2xl'>
                        {/* Admin text */}
                        <div className='py-2 pb-3'>
                            <h1 className='text-2xl font-bold text-left pl-11 text-yellow-800'>Camera setup</h1>
                        </div>
                    </div>

                    {/* Content of container */}
                    <div className='mx-10 sm:max-w-xs sm:mx-auto bg-yellow-100 rounded-3xl mt-4 pb-8'>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <div className='flex justify-center'>
                                        <div className='text-lg font-normal text-center text-yellow-700 pb-1'>
                                            <div className='pt-7 px-8 sm:px-3'>
                                                {/* Big screen */}
                                                <h3 className="hidden sm:inline-flex">
                                                    Enter your camera details:
                                                </h3>
                                                {/* Small screen */}
                                                <h3 className="inline-flex sm:hidden">
                                                    Enter your details:
                                                </h3>
                                            </div>
                                            
                                            {/* Text form for name*/}
                                            <div className='pt-5 -mb-1'>
                                                <div className=''>
                                                    {/* Give some text in front of the input form */}
                                                    <div className='text-sm text-left text-yellow-700'>
                                                        <div className='px-10 sm:px-5'>
                                                            <h3 className="hidden sm:inline-flex">
                                                                Camera name:
                                                            </h3>
                                                            <h3 className="inline-flex sm:hidden">
                                                                Name:
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    {/* Input form, when selected reset name */}
                                                    <input autoFocus maxLength={7} className='rounded-full py-1 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-50' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* Text form for id, make sure only integers are accepted*/}
                                            <div className='pt-5 -mb-1'>
                                                <div className=''>
                                                    {/* Give some text in front of the input form */}
                                                    <div className='text-sm text-left text-yellow-700'>
                                                        <div className='px-10 sm:px-5'>
                                                            <h3 className="hidden sm:inline-flex">
                                                                Camera ID:
                                                            </h3>
                                                            <h3 className="inline-flex sm:hidden">
                                                                ID:
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    {/* Give 5 buttons, if clicked it sets the camera ID to the corresponding clicked number and makes the button big*/}
                                                    <div className='flex justify-center pb-2 pt-1'>
                                                        <button className={`bg-yellow-300 rounded-3xl py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-50 ${id === 1 ? 'bg-yellow-300 rounded-full py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-100' : 'opacity-30'}`} type="button" onClick={() => setId(1)}>1</button>
                                                        <button className={`bg-yellow-300 rounded-3xl py-1 px-2 mx-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-50 ${id === 2 ? 'bg-yellow-300 rounded-full py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-100' : 'opacity-30'}`} type="button" onClick={() => setId(2)}>2</button>
                                                        <button className={`bg-yellow-300 rounded-3xl py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-50 ${id === 3 ? 'bg-yellow-300 rounded-full py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-100' : 'opacity-30'}`} type="button" onClick={() => setId(3)}>3</button>
                                                        <button className={`bg-yellow-300 rounded-3xl py-1 px-2 mx-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-50 ${id === 4 ? 'bg-yellow-300 rounded-full py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-100' : 'opacity-30'}`} type="button" onClick={() => setId(4)}>4</button>
                                                        <button className={`bg-yellow-300 rounded-3xl py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-50 ${id === 5 ? 'bg-yellow-300 rounded-full py-1 px-2 text-center text-sm font-bold sm:text-lg text-yellow-600 opacity-100' : 'opacity-30'}`} type="button" onClick={() => setId(5)}>5</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </label>
                                

                                {/* Submit button */}
                                <div className='font-spaceGrotesk flex justify-center p-4 max-w-7xl mx-auto'>
                                    <div className='transition group cursor-pointer p-2 bg-yellow-300 px-6 py-1 
                                                space-y-5 rounded-3xl sm:rounded-full hover:bg-yellow-700 hover:scale-105'>
                                        <input className='text-md sm:text-md font-bold text-yellow-700 group-hover:text-yellow-50' type="submit" value="Submit" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    } else {
        // Set id by choosing in the graph, put buttons over the camera positions
        return ( 
            <div id='container' className='max-w-5xl mx-auto h-screen mt-2 overflow-hidden'>
                {/* The stage component */}
                <div>
                    <Wrapper selectedId={id} />
                </div>

                {/* The chat component */}
                <div className=''>
                    <ChatCam id={id}/>
                </div>
            </div>
        )
    }

    // else {
    //     // Return text saying that there is no admin active in the middle of the screen
    //     return (
    //         <div className='max-w-5xl mx-auto h-screen overflow-hidden'>
    //             <div className='flex justify-center items-center h-full'>
    //                 <div className='text-center font-normal'>
    //                     <h1 className='text-2xl sm:text-4xl -mt-20 text-yellow-700'>
    //                         No admin active
    //                     </h1>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}