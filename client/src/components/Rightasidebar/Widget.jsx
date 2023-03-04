import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blackLogo from '../../assets/blacklogo.svg'

const Widget = () => {
  return (
    <div className='widget'>
        <h4>The Overflow blog</h4>
        <div className='right-sidebar-div-1'>

            <div className='right-sidebar-div-2'>
               <img src={pen} alt="pen" width='18' />
                <p>Observability is key to the future of software (and your DevOps caree?)</p>
            </div>

            <div className='right-sidebar-div-2'>
               <img src={pen} alt="pen" width="18" />
                <p>Prodcast 374: How valuable is your screen name?</p>
            </div>

        </div>
       
        <h4>Featured on Meta</h4>
        <div className='right-sidebar-div-1'>

            <div className='right-sidebar-div-2'>
               <img src={comment} alt="comment" width="18" />
                <p>Product 374: How valuable is your sc</p>
            </div>

            <div className='right-sidebar-div-2'>
               <img src={comment} alt="comment" width="18" />
                <p>welcome valued associats </p>
            </div>

            <div className='right-sidebar-div-2'>
               <img src={blackLogo} alt="blackLogo" width="18" />
                <p>Outdated Assvers: accepted answer is</p>
            </div>

        </div>
        
        <h4>Hot Meta Posts</h4>
        <div className='right-sidebar-div-1'>

            <div className='right-sidebar-div-2'>
               <p>29</p>
                <p>why was this spam flag declined, yet the question ma</p>
            </div>

            <div className='right-sidebar-div-2'>
                <p>47</p>
                <p>What is the best course of action</p>
            </div>

            <div className='right-sidebar-div-2'>
               <p>87</p>
                <p>It is a ink to the "how to ask" help</p>
            </div>
            
        </div>

    </div>
  )
}

export default Widget
