import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ClassesIndex = () => {

    const [classes, setClasses] = useState([])
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
   const fetchClasses = async (page = 1, query = "") => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/student-classes?page=${page}&search=${query}`
        )

        setClasses(response.data.data)
        setPagination(response.data)
        setCurrentPage(response.data.current_page)

    } catch (error) {
        console.log(error)
    }
}

    useEffect(() => {
        fetchClasses(currentPage, search)
    }, [currentPage])

      // 🔥 Debounce Search (500ms delay)
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
             fetchClasses(1, search) 
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [search])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/student-classes/${id}`)
                toast.success(response.data.message)
               fetchClasses(currentPage, search)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
    }

  return (
    <div>


        <section class="p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
     
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Link to="/classes/create" type="button" className="flex items-center justify-center text-white bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add class
                    </Link>
                  </div>
                  
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                              <th scope="col" class="px-4 py-3">#</th>
                            <th scope="col" class="px-4 py-3">Class name</th>
                      
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes && classes.length > 0 ? classes.map((cls, index) => (
                            <tr key={index} class="border-b dark:border-gray-700">
                                <td class="px-4 py-3">{index + 1}</td>
                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cls.name}</th>
                                <td class="px-4 py-3">
                                    <Link to={`/classes/${cls.id}/edit`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                   <button class="font-medium text-red-600 dark:text-red-500 hover:underline ml-4" onClick={() => handleDelete(cls.id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr class="border-b dark:border-gray-700">
                                <td colspan="3" class="px-4 py-3 text-center">No classes available</td>
                            </tr>
                        )}

                
                       
                    </tbody>
                </table>
            </div>
         <nav className="flex justify-between items-center p-4">

    <span className="text-sm text-gray-600">
        Showing {pagination.from} to {pagination.to} of {pagination.total}
    </span>

    <div className="flex gap-2">

        {/* Previous Button */}
        <button
            disabled={!pagination.prev_page_url}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
        >
            Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: pagination.last_page || 0 }, (_, i) => (
            <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                        ? "bg-black text-white"
                        : ""
                }`}
            >
                {i + 1}
            </button>
        ))}

        {/* Next Button */}
        <button
            disabled={!pagination.next_page_url}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
        >
            Next
        </button>

    </div>
</nav>
        </div>
    </div>
    </section>


    </div>
  )
}

export default ClassesIndex