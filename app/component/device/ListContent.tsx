import React from "react"

export const DeviceListContent = ({children}: { children: React.JSX.Element[] }) => {
    return (
        <div 
                className="w-full grid grid-cols-5 gap-4"
        >
                {children}
        </div>
    )
}