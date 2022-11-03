import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { User } from '../../Components/admin/User'
import { getAllUsers } from '../../requests/user'
import '../../styles/users.css'

export const Users = () => {
    const [users, setUsers] = useState()
    const [error, setError] = useState()
    const [valid, setValid] = useState()

    useEffect(() => {
        getUsersData()
    }, [])

    useEffect(() => {
        if(error || valid){
            setTimeout(() =>{
                setError('')
                setValid('')
            }, 5000)
            
        }
    }, [error, valid])

    const getUsersData = async () => {
        const data = await getAllUsers()
        if(data?.status === 200){
            setUsers(data.data)
        }
    }

    return (
        <section>
            { error &&
                <p className='error'>{error}</p>
            }
            { valid &&
                <p className='success'>{valid}</p>

            }
            <table>
                <thead>
                    <tr>
                        <th>Utilisateur</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { users &&
                        users.map( u =>
                            <User user={u} key={u.id} error={setError} valid={setValid}/>   
                        )

                    }
                </tbody>
                
            </table>
        
        </section>
        
    )
}
