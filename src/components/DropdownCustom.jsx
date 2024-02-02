import React, { useState, ReactNode } from 'react'
import { Link } from 'react-router-dom';

const DropdownCustom = ({
    title,
    className,
    items = [],
    onSelected = (item) => { },
    children
}) => {

    const [isOpen, setIsOpen] = useState(false);
    function handleSelectedItem(item) {
        setIsOpen(false);
        onSelected(item);
    }

    return (
        <div className="relative">
            {/* <!-- Dropdown toggle button --> */}
            <button onClick={() => setIsOpen(prev => !prev)} className={`${className} bg-blue-700 text-white font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center`} type="button">
                <span>{title}</span>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            {isOpen && (
                <div className={"absolute w-full bg-white divide-y  rounded-lg shadow  dark:bg-yellow-700 dark:divide-gray-600"}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {items.map((item, index) => (
                            <li key={index} onClick={() => handleSelectedItem(item)} className="w-full text-center">
                                <Link to={item.path} className="block px-2 py-3 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" reloadDocument>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="py-2">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropdownCustom