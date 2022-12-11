import { useState } from "react";
import { getDatabase, ref, set } from 'firebase/database';
import { writeAdminData, handleCamJSON, resetCamData, handleStageJSON  } from './databaseConnection';
import Link from 'next/link'


export const SerialReader = () =>{
    
    const [read, setReader] = useState(0)
    const [adminActive, setAdminActive] = useState(false)
    writeAdminData(adminActive);
    resetCamData();
    
    const openSerialPort = async () =>{
        const port = await navigator.serial.requestPort();
        await port.open({
        baudRate: 115200
        });
        setReader(1);
        setAdminActive(true);
        writeAdminData(adminActive);


        // main read loop
        let message = [];
        while (port.readable) {
            const reader = port.readable.getReader();
            try {
                while (true) {
                    await reader.read().then(function processText({value, done}){
                        if (done) {
                            console.log("Stream complete");
                            reader.cancel();
                            para.textContent = result;
                            return;
                          }
                        
                        // Convert arraybuffer to ascii
                        const tempArr = [...value]
                        message = [...message, ...tempArr]
                        if(JSON.stringify(tempArr.slice(tempArr.length-2)) === JSON.stringify([13, 10])){
                            const res = message.slice(0, message.length-2).map((val) => {
                                return String.fromCharCode(val);
                            })
                            // Make it a try catch block to handle errors, because sometimes the data is not complete
                            try {
                                const data = res.join("")
                                console.log(data)
                                // Split the data based on enters
                                const ordered_data = data.split('\n')

                                // Handle admin data
                                const stage_data = ordered_data[0]
                                handleStageJSON(stage_data)                            

                                // Get camera data, regardless of how many given cameras
                                const camera_data = [];
                                if (ordered_data.length > 1){
                                    for (let i = 0; i < ordered_data.length - 1; i++){
                                        camera_data.push(ordered_data[i+1])
                                    }
                                    // Handle camera data
                                    handleCamJSON(camera_data);
                                }
                            } catch (error) {
                                console.log(error)
                            }
            
                            // reset message
                            message = []
                        }
                        
                        // call the function again
                        return reader.read().then(processText);
                    })
                }
            } catch (error) {
                console.log(error)
            } finally {
                reader.releaseLock();
            }
        }
    }

    // Button to connect 
    if (read == 0){
        // Arduino is not connected
        return(
            <div>
                <div className='flex justify-center'>
                    <div className='text-sm text-left text-yellow-600 underline pl-5 pt-5 px-5'>
                        <div className=''>
                            <a href='https://twcontrols.com/lessons/how-to-tell-what-com-port-your-usb-to-serial-adapter-is-assigned'>Locate COM-port on Windows</a>
                        </div>
                    </div>

                    <div className='text-sm text-left text-yellow-600 underline pl-5 pt-5 px-5'>
                        <div className=''>
                            <a href='https://www.quora.com/How-do-I-check-what-USB-devices-are-connected-to-a-Mac'>Locate your USB port on IOS</a>
                        </div>
                    </div>
                </div>
                
                <div className=''>
                    <div className='font-spaceGrotesk flex justify-center p-4 max-w-7xl mx-auto'>
                        <div className='transition group cursor-pointer p-2 bg-yellow-300 px-6 py-1 
                                    space-y-5 rounded-3xl sm:rounded-full hover:bg-yellow-700 hover:scale-105'>
                            <button className='text-sm sm:text-md font-bold text-yellow-700 group-hover:text-yellow-50' onClick={() => openSerialPort()}> Connect Serial Port </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else 
    {   // Arduino is connected
        return(
            <div>
                <div className='flex justify-center'>
                    <div className='text-sm text-left text-yellow-600 pl-5 pt-5 px-5'>
                        <div className=''>
                            <h3>Succesfully connected to local Musicam Mesh Network!</h3>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='font-spaceGrotesk flex justify-center p-4 max-w-7xl mx-auto'>
                        <div className='transition group cursor-pointer p-2 bg-fuchsia-300 px-6 py-1 
                                    space-y-5 rounded-3xl sm:rounded-full hover:bg-fuchsia-700 hover:scale-105'>
                            <Link href='/admin/control'>
                                <h3 className="text-sm sm:text-md font-bold text-fuchsia-700 group-hover:text-fuchsia-50">
                                    Open Control Panel
                                </h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
