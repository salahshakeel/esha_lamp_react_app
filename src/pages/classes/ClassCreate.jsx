import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { PrimaryButton } from '../../components/PrimaryButton'
import { InputLabel } from '../../components/InputLabel'
import { FormHeading } from '../../components/FormHeading'
import axios from 'axios'
import { toast } from 'react-toastify'

const ClassCreate = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Class name must be at least 3 characters')
        .required('Class name is required'),
      description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Class description is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/student-classes',
          values,
            {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token"),
                                },
                            }
        )

        toast.success(response.data.message)
        resetForm()
        window.location.href = "/classes"

      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
      }
    }
  })

  return (
    <div>
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <FormHeading text={"Add a new class"} />

          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              {/* Class Name */}
              <div className="sm:col-span-2">
                <InputLabel htmlFor="name" text="Class name" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Please enter class name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Class Description */}
              <div className="sm:col-span-2">
                <InputLabel htmlFor="description" text="Class description" />
                <TextArea
                  id="description"
                  name="description"
                  rows="8"
                  placeholder="Please enter class description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>

            </div>

            <PrimaryButton text={formik.isSubmitting ? "Creating..." : "Create Class"} disabled={formik.isSubmitting} />
          </form>
        </div>
      </section>
    </div>
  )
}

export default ClassCreate