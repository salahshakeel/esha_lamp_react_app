import React from 'react'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { PrimaryButton } from '../../components/PrimaryButton'
import { InputLabel } from '../../components/InputLabel'
import { FormHeading } from '../../components/FormHeading'

const StudentCreate = () => {
  return (
    <div>

          <section class="">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <FormHeading text={"Add a new student"}/>
              <form action="#">
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div class="sm:col-span-2">
                       <InputLabel htmlFor={"student_name"} text={"Student name"}/>
                           <Input 
                                type="text"
                                name="student_name"
                                id="student_name"
                                placeholder={"Please enter student name"}
                                required={true}
                            />
                      </div>
                     
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"student_description"} text={"Student description"}/>
                        <TextArea 
                            id="student_description"
                            name="student_description"
                            rows="8"
                            placeholder={"Please enter student description"}
                            required={true}
                        />
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