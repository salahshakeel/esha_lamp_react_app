import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FormHeading } from '../../components/FormHeading'
import { InputLabel } from '../../components/InputLabel'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { PrimaryButton } from '../../components/PrimaryButton'
import { toast } from 'react-toastify'
const ClassEdit = () => {
    const {id} = useParams()
    const [user, setUser] = useState({
        name: '',
        description: ''
    })

    const fetchClass = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/student-classes/${id}/edit`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }

            )
            console.log(response.data)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchClass()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8000/api/student-classes/${id}`, user,
                {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token"),
                                },
                            }

            )
            console.log(response.data)
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <div>

  <section class="">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <FormHeading text={`Edit ${user.name}`}/>
              <form onSubmit={handleSubmit}>
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"class_name"} text={"Class name"}/>
                          <Input 
                            name="class_name"
                            id="class_name"
                            placeholder={"Please enter class name"}
                            required={true}
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                          />
                      </div>
                     
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"class_description"} text={"Class description"}/>
                           <TextArea 
                              id="class_description"
                              name="class_description"
                              rows="8"
                              placeholder={"Please enter class description"}
                              required={true}
                              value={user.description}
                              onChange={(e) => setUser({...user, description: e.target.value})}
                            />
                      </div>
                  </div>
                 <PrimaryButton text={"Update class"}/>
              </form>
          </div>
        </section>

    </div>
  )
}

export default ClassEdit