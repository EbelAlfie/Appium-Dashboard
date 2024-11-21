import { DeviceModel } from "@/domain/Device"
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, useEffect, useMemo, useState } from "react"

const ReadyLabel = ({isReady, ...props}: {isReady: boolean, props?: HTMLAttributes<HTMLParagraphElement>}) => {
    const [color, setColor] = useState<string>() 

    useEffect(
        () => setColor(isReady ? "green-500" : "red-500"), 
        [isReady]
    )

    return (
        <div className="flex flex-row m-3">
            <div className={`self-center me-2 rounded-xl size-2 bg-${color}`} />
            <label className={`text-${color}`} {...props}
            >
                {isReady? "Ready" : "Busy"}
            </label>
        </div>
    )
}

const DeviceName = ({deviceName}: {deviceName: string}) => {
    return (
        <h3 className="m-3">{deviceName}</h3>
    )
}

type DeviceInfoProps = {
    name: string, 
    attribute: string | boolean | number
}
const DeviceInfo = (props: DeviceInfoProps) => {
    return (
        <div className="w-auto flex flex-row justify-between m-2">
            <label>{props.name}:</label>
            <label>{props.attribute}</label>
        </div>
    )
}

const DeviceButton = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button 
            className="border-yellow-500 border-2 p-5" 
            {...props}
        >
            Use device
        </button>
    )
}

type DeviceProps = {
    device: DeviceModel,
    onUseButtonClicked?: (device: DeviceModel) => void,
    onBlockDeviceClicked?: () => void
}

export const DeviceItem = (
    {device, onUseButtonClicked, onBlockDeviceClicked}: DeviceProps
) => {
    const onUseClicked = () => {
        onUseButtonClicked && onUseButtonClicked(device)
    }
    
    return (
        <div 
            className="w-auto flex flex-col rounded-lg border-blue-400 border-2"
        >
            <ReadyLabel isReady={!device.busy}/>
            <hr />
            <DeviceName deviceName={device.name} />
            <hr />

            <div className="m-2">
                <DeviceInfo 
                    name="UDID"
                    attribute={device.udid}
                />
                <DeviceInfo 
                    name="Version"
                    attribute={device.sdk}
                />
                <DeviceInfo 
                    name="Location"
                    attribute={device.host}
                />
                <div className="flex flex-row">
                    <DeviceButton
                        onClick={onUseClicked}
                    />
                </div>
            </div>
            
        </div>
    )
}