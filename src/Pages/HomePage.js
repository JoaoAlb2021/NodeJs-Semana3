import React from 'react'
import {Link} from 'react-router-dom'


function HomePage(){
    return (
      
        <div className="App">
          <p>Welcome to Migracode</p>
          <div id='start-button'>
            <Link to='Home'>Start</Link>
          </div>
        </div>
        
      
    )
  }

  export default HomePage


