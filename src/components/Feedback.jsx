import React, { useState } from 'react'
import { postDataDashboard } from "../api/homeService";
import loadingGIF from "../images/loading.gif";

const Feedback = () => {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedBack] = useState({
        displayName: '',
        title: '',
        message: ''
    })

    function handleFormChange(e) {
        setFeedBack({
            ...feedback,
            [e.target.name]: e.target.value
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        setLoading(true);
        await postDataDashboard({ endpoint: '/feedback', data: feedback });
        setFeedBack({
            displayName: '',
            title: '',
            message: ''
        })
        setLoading(false);
    }

    return (
        <form onSubmit={handleFormSubmit} className="mx-14 py-8 mt-10 border-2 border-[#3281F7] rounded-lg">
            <div className="mt-10 text-center font-bold">Contact Us</div>
            <div className="mt-3 text-center text-4xl font-bold">Give Feedback</div>
            <div className="p-8  ">
                <div className="flex gap-4 pb-8">
                    <input onChange={handleFormChange} value={feedback.displayName} type="text" name="displayName" className="block w-1/2 rounded-md font-semibold text-gray-700 border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Display Name *" required />
                    <select onChange={handleFormChange} name="title" id="title" className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-gray-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" required >
                        <option>Please Select *</option>
                        <option>Student</option>
                        <option>Office Staff</option>
                        <option>Worker</option>
                    </select>
                </div>
                <div className="">
                    <textarea onChange={handleFormChange} name="message" id="message" cols="30" rows="10" className="mb-10 h-40 w-full resize-none rounded-md text-black border border-slate-300 p-5 font-semibold" required placeholder='Message'></textarea>
                </div>
                <div className="text-center">
                    <button type='submit' className="cursor-pointer rounded-lg  text-sm font-semibold text-white focus bg-gray-700 px-6 py-3 uppercase btn lg sm:text-sm sm:px-2 md:text-base md:px-4">
                        {loading ?
                            <img className="w-20 px-6 " src={loadingGIF} alt="Loading" />
                            : 'Send Feedback'
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Feedback