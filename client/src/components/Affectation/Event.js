import React from 'react'
import  ReactDOM  from 'react-dom'
import './styles.css'
const Event = ({open, eventInfo, onClose}) => {
    if (! open) return null
    return ReactDOM.createPortal(
        <div className="modal-container">
            <div>
                Our event 
            </div>
                {eventInfo !== undefined && 
                    <div>
                        {eventInfo.title}
                    </div>
                }
        </div>,
        document.getElementById("portal")
    )
}


export default Event

