import React from "react"
import "./welcome.css"

const Welcome = (props) => {

  return (
    
    <section className="welcome">
      <h1 className="welcome--title">Quizzet</h1>
      <p className="welcome--text">Let's have fun with some quiz</p>

      <button 
        className="welcome--cta"
        onClick={props.onStart}
      >Start quiz</button>

      <img src="./images/blobs.png"className="welcome--blob_1"></img>
      <img src="./images/blob2.png" className="welcome--blob_2"></img>
    </section>
  )
}

export default Welcome