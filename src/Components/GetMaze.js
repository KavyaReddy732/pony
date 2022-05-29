import React, { useState, useEffect } from 'react';
import valuesStore from '../store/valuesStore';
import '../App.css';


const GetMaze = () => {
    const { values, setValues } = valuesStore();
    const [mazeId, setMazeId] = useState('')
    const { width, height, difficulty } = values;
    const [maze, setMaze] = useState();
    //const [data, setData] = useState();
    const [keyPress, setKeyPress] = useState('')
    const changeHandler = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const dir = ['east', 'north', 'north', 'north', 'west', 'west', 'north', 'north', 'north', 'east', 'east', 'south', 'south']

    console.log(mazeId)
    console.log(keyPress)

    const fetchMaze = async () => {
        try {
            const response = await fetch('https://ponychallenge.trustpilot.com/pony-challenge/maze', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "maze-width": Number(width),
                    "maze-height": Number(height),
                    "maze-player-name": "rarity",
                    "difficulty": Number(difficulty)
                })
            })
            const data = await response.json();
            console.log(data)
            setMazeId(data['maze_id'])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        printMaze();
        //getValues();
    }, [mazeId])

    const printMaze = async () => {
        try {
            console.log(mazeId)
            if (mazeId === '') {
                return
            }
            const getMaze = await fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`, {
                method: 'get'
            })
            const mazeData = await getMaze.text();
            console.log(mazeData)
            setMaze(mazeData)
        } catch (error) {
            console.log(error)
        }
    }

    // const getValues = async () => {
    //     try {
    //         console.log(mazeId)
    //         if (mazeId === '') {
    //             return
    //         }
    //         const response = await fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`, {
    //             method: 'get'
    //         })
    //         const data = await response.json();
    //         console.log(data)
    //         setData(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            let direction = null;
            switch (e.key) {
                case 'ArrowLeft':
                    direction = "west";
                    break;
                case 'ArrowUp':
                    direction = "north";
                    break;
                case 'ArrowRight':
                    direction = "east";
                    break;
                case 'ArrowDown':
                    direction = "south";
                    break;

                default: break;
            }
            setKeyPress(direction)
        })
    }, [])

    useEffect(() => {
        move()
    }, [keyPress])



    const move = async () => {
        let array = []
        fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "direction": keyPress
            })
        })
            .then(response => {
                if (response.status !== 200) {
                    return null;
                }
                return response.json()
            })
            .then(data => {
                if (data['state-result'] === `Can't walk in there`) {
                    alert(`can't walk in there`)
                }
                else {
                    array.push(keyPress)
                }
                console.log(data)
            })
            .catch(error => console.log(error))
        console.log(array)
    }


    return (
        <div>
            <div className='container'>
                <label>width :
                    <input type='number' name='width' value={width} onChange={changeHandler} />
                </label>
                <label>height :
                    <input type='number' name='height' value={height} onChange={changeHandler} />
                </label>
                <label>difficulty :
                    <input type='number' name='difficulty' value={difficulty} onChange={changeHandler} />
                </label>
            </div>
            <button type='submit' className='button' onClick={fetchMaze}>create maze</button>
            <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                {maze}
            </pre>
        </div>
    )
}

export default GetMaze;
