import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [maze, setMaze] = useState();
  const [id, setId] = useState('');
  const [data, setData] = useState();
  console.log(data)

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
        setId(mazeId.maze_id)
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
  useEffect(() => {
    getMaze()
  }, [id])

  const getMaze = async () => {
    try {
      if (id === '') {
        return
      }
      const getMaze = await fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${id}`, {
        method: 'get'
      })
      const mazeData = await getMaze.json();
      setData(mazeData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data === null) {
      return
    }
    move()
  }, [data])
  const move = async () => {
    data && data.data.map((directions, index) => {
      console.log(index)
      return directions.map((direction) => {
        fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${id}`, {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "direction": direction
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log(direction)
            console.log(data)
          })
          .catch(error => console.log(error))
      })
    })
  }


  return (
    <div className="App">
      <h1>{'PONY'}</h1>
      <div className='maze'>
        <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
          {maze}
        </pre>
      </div>
    </div >
  );
}

export default App;
