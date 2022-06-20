import React from 'react'
import '../CSS/HomeUtil.css'
const HomeUtil = (props) => {
  return (
    <div>
        <div className="upper">
            <p>{props.text}</p>
            <div className="home-btns">
                <div className="button1">
                    <button id='btn1'>
                        login
                    </button>
                </div>
                <div className="button2">
                    <button id='btn2'>
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeUtil