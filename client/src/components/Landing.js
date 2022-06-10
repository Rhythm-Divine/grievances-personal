import React from 'react'
import './CSS/Landing.css'

const Landing = () => {
  return (
    <>
        <div className="flex-home">
            <div className="flex-home-left">
                <span id='span1'>
                    Grievances System 
                </span>
                <span id='span2'>
                    One stop solution to all your problems in the hostel..
                </span>
            </div>
            <div className="flex-home-right">
                <div className='btns-home'>
                    <button>
                        Login
                    </button>
                    <button>
                        SignUp
                    </button>
                </div>
            </div>  
            
        </div>  
    </>
  )
}

export default Landing