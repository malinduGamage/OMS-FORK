import React from 'react'

const PrimaryButton = ({ text, onClick, disabled, className, color }) => {

    return (
        <button
            disabled={disabled ? disabled : false}
            onClick={onClick ? onClick : () => { }}
            className={`min-w-28 items-end bg-transparent hover:bg-${color ? color : 'orange'}-600 text-${color ? color : 'orange'}-600 font-normal hover:text-white py-2 px-4 border border-${color ? color : 'orange'}-600 hover:border-transparent rounded disabled:text-gray-400 disabled:border-gray-400 ${className} disabled:hover:bg-transparent disabled:cursor-not-allowed`}>
            {text}
        </button>
    )
}

export default PrimaryButton