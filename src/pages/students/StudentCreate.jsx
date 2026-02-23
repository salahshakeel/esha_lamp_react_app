import React, { useEffect, useState } from 'react'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { PrimaryButton } from '../../components/PrimaryButton'
import { InputLabel } from '../../components/InputLabel'
import { FormHeading } from '../../components/FormHeading'
import axios from 'axios'
import {toast} from 'react-toastify'
const StudentCreate = () => {

  const [classes, setClasses] = useState([])

  const fetchClasses = async () => {
    try{
      const response = await axios.get('http://localhost:8000/api/student-classes')
      setClasses(response.data)
    }
    catch(error){
      console.error('Error fetching classes:', error)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const [formData, setFormData] = useState({
    student_name: '',
    father_name: '',
    email: '',
    address: '',
    phone: '',
    class_id: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:8000/api/students', formData)
      toast.success(response.data.message)
      
      // Reset form after successful submission
      setFormData({
        name: '',
        father_name: '',
        email: '',
        address: '',
        phone: '',
        class_id: '',
      })
      window.location.href = '/students' // Redirect to students list page
    }
    catch(error){
      console.error('Error creating student:', error)
      toast.error(error.response?.data?.message || 'Failed to create student')
    }
  }

  return (
    <div>

          <section class="">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <FormHeading text={"Add a new student"}/>
              <form onSubmit={handleSubmit} class="space-y-6">
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div class="sm:col-span-2">
                       <InputLabel htmlFor={"student_name"} text={"Student name"}/>
                           <Input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder={"Please enter student name"}
                                required={true}
                                onChange={handleChange}
                            />
                      </div>

                      <div class="sm:col-span-2">
                       <InputLabel htmlFor={"father_name"} text={"father name"}/>
                           <Input 
                                type="text"
                                name="father_name"
                                id="father_name"
                                placeholder={"Please enter father name"}
                                required={true}
                                 onChange={handleChange}
                            />
                      </div>

                      <div class="sm:col-span-2">
                       <InputLabel htmlFor={"email"} text={"Email address"}/>
                           <Input 
                                type="text"
                                name="email"
                                id="email"
                                placeholder={"Please enter email address"}
                                required={true}
                                  onChange={handleChange}
                            />
                      </div>

                          <div class="sm:col-span-2">
                       <InputLabel htmlFor={"phone"} text={"Phone number"}/>
                           <Input 
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder={"Please enter phone number"}
                                required={true}
                                  onChange={handleChange}
                            />
                      </div>

                        <div class="sm:col-span-2">
                       <InputLabel htmlFor={"address"} text={"Address"}/>
                          <TextArea
                                name="address"
                                id="address"
                                placeholder={"Please enter address"}
                                required={true}
                                  onChange={handleChange}
                            />
                      </div>

                       <div class="sm:col-span-2">
                       <InputLabel htmlFor={"class_name"} text={"Select Class name"}/>
                            <select onChange={handleChange} id="class_id" name="class_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <option value="" disabled selected>Select class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                              </select>
                      </div>
                     
                   
                  </div>
                 <PrimaryButton text={"Add student"}/>
              </form>
          </div>
        </section>
    </div>
  )
}

export default StudentCreate