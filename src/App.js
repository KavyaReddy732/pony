import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [maze, setMaze] = useState();
  console.log(maze)

  useEffect(() => {
    const maze = async () => {
      try {
        const response = await fetch('https://ponychallenge.trustpilot.com/pony-challenge/maze', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "maze-width": 15,
            "maze-height": 20,
            "maze-player-name": "rarity",
            "difficulty": 0
          })
        })
        const mazeId = await response.json();
        const getMaze = await fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId.maze_id}/print`, {
          method: 'get',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
        }).then(response => response.text())
          .catch(error => console.log(error))
        setMaze(getMaze)
      } catch (error) {
        console.log(error)
      }
    }
    maze();
  }, [])

  // useEffect(() => {
  //   getMaze();
  // }, [maze])
  // const getMaze = async () => {
  //   try {
  //     const getMaze = await fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${maze}/print`, {
  //       method: 'get'
  //     })
  //     const mazeData = getMaze;
  //     console.log(mazeData)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="App">
      <h1>{'PONY'}</h1>
      <div className='maze'>
        {maze}
      </div>
    </div>
  );
}

export default App;
