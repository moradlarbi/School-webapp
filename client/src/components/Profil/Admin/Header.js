import { useContext } from 'react'
import {Context} from "./Admin"
const Header = () => {
    const userIn = useContext(Context)
    return (
        <div className="header-container">
            <div>
                {userIn.nom}
            </div>
        </div>
    )
}

export default Header
