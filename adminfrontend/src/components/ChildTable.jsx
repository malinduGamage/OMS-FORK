import ChildTableRow from "./ChildTableRow"

const ChildTable = ({ children }) => {
    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default  sm:px-7.5 xl:pb-1"
        >
            <h4 className="mb-6 text-xl font-bold text-black ">
                Children
            </h4>

            <div className="flex flex-col">
                <div
                    className="grid grid-cols-3 rounded-sm"
                >
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base ">Name</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Gender</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Dob</h5>
                    </div>

                </div>
                {children.map((child) => (
                    <ChildTableRow
                        key={child.childid}
                        name={child.name}
                        dob={child.dob}
                        gender={child.gender}
                    />
                ))}

            </div>
        </div>
    )
}

export default ChildTable