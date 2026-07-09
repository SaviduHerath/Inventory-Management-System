import React from 'react'

function Home() {
  return (
    <div>
        <button onClick={()=>{window.location.href = '/addItem'}}>Add Item</button>    
        <button onClick={()=>{window.location.href = '/displayItem'}}>Display Item</button>

    </div>
  )
}

export default Home