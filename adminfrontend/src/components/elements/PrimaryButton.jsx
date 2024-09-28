import React from 'react';

const PrimaryButton = ({ text, onClick, disabled, className, color = 'orange' }) => {
    const baseClasses = `min-w-28 items-end font-normal py-2 px-4 border rounded disabled:text-gray-400 disabled:border-gray-400 ${className} disabled:hover:bg-transparent disabled:cursor-not-allowed`;

    // Define the color classes based on the 'color' prop
    const colorClasses = {
        orange: 'bg-transparent text-orange-600 border-orange-600 hover:text-white hover:bg-orange-600',
        blue: 'bg-transparent text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600',
        green: 'bg-transparent text-green-600 border-green-600 hover:text-white hover:bg-green-600',
        red: 'bg-transparent text-red-600 border-red-600 hover:text-white hover:bg-red-600',
        black: 'bg-transparent text-black border-black hover:text-white hover:bg-black',
    };

    const activeClasses = colorClasses[color] || colorClasses.orange; // Fallback to orange if color is not specified
    const disabledClasses = `disabled:text-gray-400 disabled:border-gray-400`;

    return (
        <button
            disabled={disabled}
            onClick={onClick ? onClick : () => { }}
            className={`${baseClasses} ${disabled ? disabledClasses : activeClasses}`}>
            {text}
        </button>
    );
};

export default PrimaryButton;
