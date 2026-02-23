import React, { useState } from 'react'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { PrimaryButton } from '../../components/PrimaryButton'
import { InputLabel } from '../../components/InputLabel'
import { FormHeading } from '../../components/FormHeading'
import axois from 'axios'
import { toast } from 'react-toastify'
const ClassCreate = () => {

  const [className, setClassName] = useState("")
  const [classDescription, setClassDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axois.post('http://localhost:8000/api/student-classes', {
        name: className,
        description: classDescription
      })
      toast.success(response.data.message)
      console.log(response.data)
      setClassName("")
      setClassDescription("")
      window.location.href = "/classes"
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>

        <section class="">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <FormHeading text={"Add a new class"}/>
              <form onSubmit={handleSubmit}>
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"class_name"} text={"Class name"}/>
                          <Input 
                            name="class_name"
                            id="class_name"
                            placeholder={"Please enter class name"}
                            required={true}
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
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
                              value={classDescription}
                              onChange={(e) => setClassDescription(e.target.value)}
                            />
                      </div>
                  </div>
                 <PrimaryButton text={"Add class"}/>
              </form>
          </div>
        </section>

    </div>
  )
}

export default ClassCreate