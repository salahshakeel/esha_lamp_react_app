import React from 'react'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { PrimaryButton } from '../../components/PrimaryButton'
import { InputLabel } from '../../components/InputLabel'
import { FormHeading } from '../../components/FormHeading'

const ClassCreate = () => {
  return (
    <div>

        <section class="">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <FormHeading text={"Add a new class"}/>
              <form action="#">
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"class_name"} text={"Class name"}/>
                          <Input 
                            type="text"
                            name="class_name"
                            id="class_name"
                            placeholder={"Please enter class name"}
                            required={true}
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