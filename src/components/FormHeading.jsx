import React from 'react'

export const FormHeading = ({text, className}) => {
  return (
    <h2 className={`mb-4 text-xl font-bold text-gray-900 dark:text-white ${className}`}>{text}</h2>
  )
}
