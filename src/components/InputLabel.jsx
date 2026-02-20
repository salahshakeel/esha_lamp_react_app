import React from 'react'

export const InputLabel = ({ htmlFor, text,className }) => {
  return (
    <label for={htmlFor} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>{text}</label>
  )
}
