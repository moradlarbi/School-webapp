import { useState } from 'react'
import { Redirect } from "react-router-dom"

const Profil = ({userInfo}) => {
    const [url, setUrl] = useState("/"+userInfo.type+":"+userInfo.id)
    
    return (
        <div>
            <Redirect to={url} />
        </div>
    )
}

export default Profil
