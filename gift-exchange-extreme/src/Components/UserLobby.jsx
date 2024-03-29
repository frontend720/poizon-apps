/* eslint-disable react/prop-types */
import {getFirestore} from "firebase/firestore"
import { app } from "../config"
import {useState} from "react"
import {v4 as uuid} from "uuid"

const UserLobby = (props) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [limit, setLimit] = useState("")
    const [invitees, setInvitees] = useState("")



console.log(uuid())

    return(
        <div>
            <label htmlFor="">{props.room}</label>
            <label htmlFor="">{props.description}</label>
            <label htmlFor="">{props.limit}</label>
            <label htmlFor="">{props.invitees}</label>
            {props.id}
        </div>
    )
}

export default UserLobby