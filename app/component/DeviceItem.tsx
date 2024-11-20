import { DeviceModel } from "@/domain/Device"
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react"

const ReadyLabel = ({isReady, ...props}: {isReady: boolean, props?: HTMLAttributes<HTMLParagraphElement>}) => {
    return (
        <p className={
            isReady ? "text-green-500" : "text-red-500"
        } {...props}
        >
            {isReady? "Ready" : "Busy"}
        </p>
    )
}

const DeviceName = ({deviceName}: {deviceName: string}) => {
    return (
        <h3>{deviceName}</h3>
    )
}

type DeviceInfoProps = {
    name: string, 
    attribute: string | boolean | number
}
const DeviceInfo = (props: DeviceInfoProps) => {
    return (
        <div className="flex-row justify-between">
            <label>{props.name}</label>
            <p>{props.attribute}</p>
        </div>
    )
}

const DeviceButton = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button 
            className="border-yellow-200 border-r-4" 
            {...props}
        />
    )
}

export const DeviceItem = ({device}: {device: DeviceModel}) => {
    return (
        <div className="flex-col border-r-8 border-blue-400">
            <ReadyLabel isReady={!device.busy}/>
            <hr />
            <DeviceName deviceName={device.name} />
            <hr />

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
            <div className="flex-row justify-between">
                <DeviceButton />
            </div>
        </div>
    )
}