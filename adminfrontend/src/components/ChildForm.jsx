const ChildForm = ({ setFormVisibility }) => {
    return (
        <div className="fixed inset-0 flex  justify-center bg-black bg-opacity-50 overflow-auto px-10">
            <section className="max-w-3xl p-4 mx-auto bg-white rounded-md shadow-md my-5">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-lg font-bold text-gray-700 capitalize">Add Child</h1>
                    <button className="px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => setFormVisibility(false)}>Close</button>
                </div>
                <div className="overflow-y-auto max-h-[80vh]">
                    <form>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-4">
                            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                                <label className="text-gray-700" htmlFor="name">Name of the child</label>
                                <input id="name" type="text" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                                <label className="text-gray-700" htmlFor="date_of_birth">Date of Birth</label>
                                <input id="date_of_birth" type="date" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1">
                                <label className="text-gray-700" htmlFor="gender">Gender</label>
                                <select id="gender" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="text-gray-700" htmlFor="nationality">Nationality</label>
                                <input id="nationality" type="text" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1 sm:col-span-2 ">
                                <label className="text-gray-700" htmlFor="religion">Religion</label>
                                <input id="religion" type="text" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1 sm:col-span-2 ">
                                <label className="text-gray-700" htmlFor="medicaldetails">Medical Details</label>
                                <textarea id="medicaldetails" className="resize-none block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"></textarea>
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                                <label className="text-gray-700" htmlFor="educationaldetails">Educational Details</label>
                                <textarea id="educationaldetails" className="resize-none block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"></textarea>
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                                <label className="block text-sm font-medium text-gray-700">Image **********not implemented*************</label>
                                <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-10 w-10 text-gray-700" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-gray-700 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span className="">Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1 text-gray-700">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-700">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="px-4 py-2 leading-5 text-gray-700 transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 focus:outline-none focus:bg-gray-600">Submit</button>
                        </div>
                    </form>
                </div>
            </section>


        </div >
    )
}

export default ChildForm