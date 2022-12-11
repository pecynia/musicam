import { getDatabase, ref, onValue } from 'firebase/database';
import React from 'react';

const database = getDatabase();
const dbref = ref(database, 'cameras')


export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        onValue(dbref, (snapshot) => {
            let cameras = [];
            snapshot.forEach(child => {
                let keyName = child.key;
                let data = child.val()
                cameras.push({"key":keyName, 'data':data});                
            });
            this.setState({tableData: cameras});
        })
    }

    render(){
        return(
            <div className='flex justify-center bg-yellow-300'>
                {this.state.tableData.map((row, index) => {
                    return (
                        <div className=''>
                            <ul key={index} className='list-disc'>
                                <li>Camera: {row.key}</li>
                                <li>Angle {row.data.angle}</li>
                                <li>x: {row.data.x}</li>
                                <li>y: {row.data.y}</li>
                                <li>msg: {row.data.message}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default RealtimeData