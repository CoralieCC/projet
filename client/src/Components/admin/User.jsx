import React, { useState } from 'react'
import { useEffect } from 'react'
import { deleteUser, updateRole } from '../../requests/user'
import Select from 'react-select'
import { customStyles } from '../../styles/reactSelect'

export const User = (props) => {
    const {user, error, valid} = props
    const [role, setRole] = useState(user.role)
    const [defaultRole, setDefaultRole] = useState()

    useEffect(() => {
        setRole(user.role)
    }, [])
    useEffect(() => {
        const filter = options.filter(opt => opt.value === user.role)
        setDefaultRole(filter[0].label)
    }, [user])

    const modifyRole = async () => {
        const data = await updateRole(user.id, role) 
        if(data?.status === 200){
            valid("L'utilisateur a bien été modifié")
        } else {
            error("Une erreur s'est produite")
        }
    }

    const delUser = async () => {
        const data = await deleteUser(user.id)
        console.log(data)
    }

    const options = [
        {value:1, label: "Admin"},
        {value:2, label: "Modérateur"},
        {value:3, label:"Utilisateur"},
        {value:4, label:"Désactiver"}
    ]
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <Select placeholder={defaultRole} options={options} styles={customStyles} onChange={(selectedOption) => setRole(selectedOption.value)} noOptionsMessage={({inputValue}) => !inputValue ? "" : "Aucun résultat"}/>           
            </td>
            <td><i className="fa-solid fa-trash" onClick={() => delUser()}></i><i className="fa-regular fa-pen-to-square" onClick={() => modifyRole()}></i></td>
        </tr>
    )
}
