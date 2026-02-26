import React, { useState } from 'react'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { PrimaryButton } from '../../components/PrimaryButton'
import { InputLabel } from '../../components/InputLabel'
import { FormHeading } from '../../components/FormHeading'
import axios from 'axios'
import { toast } from 'react-toastify'
const UserCreate = () => {
     const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users', {
                name,
                email,
                password
            },  {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token"),
                                },
                            });
            console.log(response);
            if (response.status === 200) {
                toast.success("User created successfully!");
                setName("");
                setEmail("");
                setPassword("");

                window.location.href = "/users";
            }
        } catch (error) {
            toast.error("Error creating user!");
        }
    };
  return (
    <div>

    <section class="">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <FormHeading text={"Add a new user"}/>
              <form onSubmit={handleSubmit}>
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"name"} text={"User name"}/>
                          <Input 
                            type="text"
                            name="name"
                            id="name"
                            placeholder={"Please enter user name"}
                            required={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                      </div>
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"email"} text={"User email"}/>
                          <Input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder={"Please enter user email"}
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      <div class="sm:col-span-2">
                         <InputLabel htmlFor={"password"} text={"User password"}/>
                          <Input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder={"Please enter user password"}
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                     
                     
                  </div>
                 <PrimaryButton type='submit' text={"Add user"}/>
              </form>
          </div>
        </section>

    </div>
  )
}

export default UserCreate