import React from 'react'
import { Link } from 'react-router-dom'

export const Banner = ({title}) => {
  return (
    

        <section class="mt-16">
            <div class="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16">
                <h1 class="mb-6 text-4xl font-bold tracking-tighter text-heading md:text-5xl lg:text-6xl">{title}</h1>
                <p class="mb-8 text-base font-normal text-body md:text-xl">Here you can manage your classes and students</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4">
                    <Link to={'/students'} class="bg-black inline-flex items-center justify-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-5 py-3 focus:outline-none">
                        Getting started
                        <svg class="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                    </Link>
                  
                </div>
            </div>
        </section>

  )
}
