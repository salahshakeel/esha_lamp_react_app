import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from '../../components/Input'
import { PrimaryButton } from '../../components/PrimaryButton'
import { InputLabel } from '../../components/InputLabel'
import { FormHeading } from '../../components/FormHeading'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/auth/login',
          values
        )

        toast.success(response.data.message)
        localStorage.setItem('token', response.data.token)
        resetForm()
        window.location.href = "/"

      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
      }
    }
  })

  return (
    <div>
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <FormHeading text={"Login"} />

          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              {/* Email */}
              <div className="sm:col-span-2">
                <InputLabel htmlFor="email" text="Email" />
                <Input
                  id="email"
                  name="email"
                  placeholder="Please enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="sm:col-span-2">
                <InputLabel htmlFor="password" text="Password" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Please enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

            </div>

            <PrimaryButton text={formik.isSubmitting ? "Logging in..." : "Login"} disabled={formik.isSubmitting} />
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login