import React, { useState } from 'react'

const ModalCustom = ({
    title = '',
    className = '',
    children,
    setOpen,
    open
}) => {

    return (
        <section className={`${open ? "" : 'hidden'} ${className} overflow-x-hidden fixed top-0 z-50 flex justify-center items-center w-full`}>
            <div className="overflow-y-auto relative w-full max-w-xl min-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setOpen(!open)}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                    <div className="p-5 rounded-2xl bg-white text-black">
                        <h3 className="pb-3 text-xl font-semibold text-gray-900 dark:text-white border-b rounded-t dark:border-gray-600">{title}</h3>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModalCustom;