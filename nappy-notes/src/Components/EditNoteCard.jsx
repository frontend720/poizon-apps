import React from 'react'
import { EditContainer } from '../StyleSheet'
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai"


export default function EditNoteCard({edit, del}) {
  return (
    <EditContainer>
        <AiOutlineEdit onClick={edit} size="24px" />
        <AiOutlineDelete onClick={del} size="24px" />
    </EditContainer>
  )
}
