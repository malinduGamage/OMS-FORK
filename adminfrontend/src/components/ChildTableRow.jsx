import React from 'react'

const ChildTableRow = ({ name, gender, dob }) => {
    const imageURL = `https://avatar.iran.liara.run/public/${gender === 'Male' ? 'boy' : 'girl'}?username=${name.split(' ').join('')}`
    console.log(dob)
    return (

        <div className="grid grid-cols-3 border-b border-stroke  hover:bg-orange-600 text-gray-500  hover:text-white font-medium rounded" >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0 w-8">
                    <img src={imageURL} alt="Brand" />
                </div>
                <p className="hidden font-medium  sm:block">
                    {name}
                </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p cla>{gender}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p >{dob}</p>
            </div>

        </div>

    )
}

export default ChildTableRow