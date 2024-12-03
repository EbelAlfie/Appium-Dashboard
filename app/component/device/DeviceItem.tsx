import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, useEffect, useMemo, useState } from "react"

const ReadyLabel = ({isReady, ...props}: {isReady: boolean, props?: HTMLAttributes<HTMLParagraphElement>}) => {
    const [textColor, setTextColor] = useState<string>() 
    const [dotColor, setDotColor] = useState<string>()

    useEffect(
        () => {
            setTextColor(isReady ? "text-green-500" : "text-red-500")
            setDotColor(isReady ? "bg-green-500" : "bg-red-500")
        },
        [isReady]
    )

    return (
        <div className="flex flex-row m-3">
            <div className={`self-center me-2 rounded-xl size-2 ${dotColor}`} />
            <label className={textColor} {...props}
            >
                {isReady? "Ready" : "Busy"}
            </label>
        </div>
    )
}

const DeviceName = ({deviceName}: {deviceName: string}) => {
    return (
        <h3 className="text-2xl font-bold m-3">{deviceName}</h3>
    )
}

type DeviceInfoProps = {
    name: string, 
    attribute: string | boolean | number
}
const DeviceInfo = (props: DeviceInfoProps) => {
    return (
        <div className="w-auto flex flex-row justify-between m-2">
            <label className="text-slate-400">{props.name}:</label>
            <label className="text-slate-400">{props.attribute}</label>
        </div>
    )
}

const DeviceButton = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button 
            className="bg-[#0075FF] p-3 rounded-md hover:transition-colors hover:shadow-2xl hover:shadow-[#263DB8]" 
            {...props}
        />
    )
}

type DeviceProps = {
    device: DeviceModel,
    onUseButtonClicked?: (device: DeviceModel) => void,
}

export const DeviceItem = (
    {device, onUseButtonClicked}: DeviceProps
) => {

    const onBlockClicked = () => {
        appiumService.blockDevice(device)
        .then(result => {
            
        })
        .catch(error => {

        })
    }

    const onUseClicked = () => {
        onUseButtonClicked && onUseButtonClicked(device)
    }
    
    return (
        <div 
            className="w-auto flex flex-col rounded-lg device-item p-2"
        >
            <DeviceName deviceName={device.name} />
            <ReadyLabel isReady={!device.busy}/>

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
                    attribute={device.host.replaceAll("http://", "")}
                />
                <div className="flex flex-row justify-around mt-5">
                    <DeviceButton onClick={onUseClicked}>Use Device</DeviceButton>
                    <DeviceButton onClick={onBlockClicked}>Block Device</DeviceButton>
                </div>
            </div>
            
        </div>
    )
}