import { FunctionComponent, useEffect, useState} from "react";

// Interface for camera props
interface StageProps {
    names: string[]
    beginCoordinates: number[][]                // coordinates where the line hits the container, double array [x][y]
    endCoordinates: number[][]                  // coordinates where the line ends, double array [x][y], the name is displayed here
    ids: number[]                               // array of ids, corresponding to the names
    currentId: number                           // value of 1 to 5 
    sameHeight: number []                       // whether the camera is on the same height as the stage (influences the way it is visualized)
    stageDepth: number                          // the depth of the stage, used to calculate the container ratio
}

const scale = (windowObj: Window | undefined, container: HTMLElement|null, x: number, y: number, depth: number) => {
    if (windowObj) {
        console.log(depth)
        // Get the window size
        const windowWidth = windowObj.innerWidth
        const windowHeight = windowObj.innerHeight
        

        // Get the container size
        const containerWidth = container?.clientWidth
        const containerHeight = container ? ((container?.clientWidth * depth) < container?.clientHeight ? (container?.clientWidth * depth) : container?.clientHeight) : undefined

        // Calculate the x and y coordinates for the container size based on the window size
        let xCoord = windowWidth * x
        let yCoord = windowHeight * y
        if (containerWidth && containerHeight) {
            xCoord = Math.round(containerWidth * x)
            yCoord = Math.round(containerHeight * y)
        }

        // Return the coordinates
        return [xCoord, yCoord]
    }
    return [x, y]
}

// Function component to create a circle for each name, 
const StageComp: FunctionComponent<StageProps> = (props: StageProps) => {
    
    // Define container and window using useEffect and useState
    const [container, setContainer] = useState<HTMLElement|null>(null)
    const [windowObj, setWindowObj] = useState<Window|undefined>(undefined)
    useEffect(() => {
        setContainer(document.getElementById('container'))
        setWindowObj(window)
    }, [document, window])


    const getJSX = () => {
        let arr: JSX.Element[] = []
        props.names.map((name: string, index: number) => {
            // name can either be a string itself, or an object in the shape: {name: string}
            let nameString = typeof name === 'string' ? name : name['name']
            let stageDepth = Math.abs(props.stageDepth) > 1 ? 1 : Math.abs(props.stageDepth)

            // Get the x and y coordinates based on x and y percentages and the size of the container
            const [xBegin, yBegin] = scale(windowObj, container, props.beginCoordinates[0][index], props.beginCoordinates[1][index], stageDepth)
            const [xEnd, yEnd] = scale(windowObj, container, props.endCoordinates[0][index], props.endCoordinates[1][index], stageDepth)
            
            // Get the x and y coordinates of the top left corner of the container
            const containerX = container?.offsetLeft
            const containerY = container?.offsetTop
            
            // Get the width and height of the container
            const containerWidth = container?.clientWidth
            const containerHeight = container ? ((container?.clientWidth * stageDepth) < container?.clientHeight ? (container?.clientWidth * stageDepth) : container?.clientHeight) : undefined

            // Push the JSX to the array
            arr.push(
                <div className='absolute ' style={{top: containerY, left: containerX, width: containerWidth, height: containerHeight, backgroundColor: index === 0 ? 'rgba(255, 255, 180, 1)' : 'transparent' } } key={index}>
                    {/* Lines, circles and names */}
                    <div className="bg-yellow-200">
                        <svg className='absolute' style={{top: 0, left: 0, width: '100%', height: '100%'}}>
                            <line x1={xBegin} y1={yBegin} x2={xEnd} y2={yEnd} stroke={props.currentId === props.ids[index] ? 'tomato' : 'darkblue'} strokeWidth="7" />
                            {props.sameHeight[index] ? null : <circle cx={xEnd} cy={yEnd} r='30' fill={props.currentId === props.ids[index] ? 'tomato' : 'violet'}/>}
                            
                            {props.sameHeight[index] ? 
                                // This is for when the camera is on the same height as the stage, so the name is displayed in the field of view line with a square around it
                                <g>
                                    {/* The rectangle is rotated based on the angle of the line */}
                                    <rect 
                                        x={(xBegin + xEnd) / 2 - 35} 
                                        y={(yBegin + yEnd) / 2 - 15} width='70' height='30' 
                                        transform={`rotate(${Math.atan((yEnd - yBegin) / (xEnd - xBegin)) * 180 / Math.PI}, ${(xBegin + xEnd) / 2}, ${(yBegin + yEnd) / 2})`} 
                                        fill={props.currentId === props.ids[index] ? 'tomato' : 'darkblue'} rx='25' ry='100' 
                                    />
                                    {/* Similiary, the text is rotated based on the angle of the line */}
                                    <text 
                                        x={(xBegin + xEnd) / 2} 
                                        y={(yBegin + yEnd) / 2} textAnchor='middle' alignmentBaseline='middle' fontSize='15' 
                                        transform={`rotate(${Math.atan((yEnd - yBegin) / (xEnd - xBegin)) * 180 / Math.PI}, ${(xBegin + xEnd) / 2}, ${(yBegin + yEnd) / 2})`} 
                                        fill={props.currentId === props.ids[index] ? 'darkblue' : 'violet'}>{props.currentId === props.ids[index] ? 'You' : nameString}</text> 
                                </g>
                                : 
                                // This is for when the camera is not on the same height as the stage, the name is displayed in a circle
                                <g>
                                    {/* The circle is filled with a color based on the currentId */}
                                    <circle cx={xEnd} cy={yEnd} r='30' fill={props.currentId === props.ids[index] ? 'tomato' : 'violet'}/>
                                    {/* The text is displayed in the circle, color also depending on the currentId */}
                                    <text x={xEnd} y={yEnd} textAnchor='middle' alignmentBaseline='middle' fontSize='15' fill={props.currentId === props.ids[index] ? 'darkblue' : 'darkblue'}>
                                        {props.currentId === props.ids[index] ? 'You' : nameString}
                                    </text>
                                </g>
                            }
                        </svg> 
                    </div>
                    
                    {/* Squares in the corners and stage descriptions */}
                    <div>
                        {containerWidth && containerHeight && (
                            <div className=''>
                                <svg className='absolute' style={{top: 0, left: 0, width: '100%', height: '100%'}}>
                                    {/* Triangle pointing downwards in the middle bottom of the stage, with an offset up of 20 pixels  */}
                                    <polygon points={`${containerWidth / 2 - 10},${containerHeight - 25} ${containerWidth / 2 + 10},${containerHeight - 25} ${containerWidth / 2},${containerHeight - 10}`} fill="darkblue" />


                                    {/* Corner squares, uneven because of the border */} 
                                    <rect x={0} y={0} width="20" height="20" fill="darkblue" />
                                    <rect x={containerWidth - 20} y={0} width="20" height="20" fill="darkblue" />
                                    <rect x={0} y={containerHeight - 20} width="20" height="20" fill="darkblue" />
                                    <rect x={containerWidth - 20} y={containerHeight - 20} width="20" height="20" fill="darkblue" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            )
        })
        return arr
    }
    // Return component as an JSX.Element array, to prevent the render children error 
    return (
        <div className=''>
            {getJSX()}
        </div>
    )
}

export default StageComp

