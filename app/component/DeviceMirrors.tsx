import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect, useState } from "react"
import { DeviceInstance } from "./DeviceInstance"

type DeviceMirrorProps = {
    deviceMirrors: Array<DeviceModel>
}

export const Devices = (props: DeviceMirrorProps) => {
    let socket: Array<WebSocket> = []

    const [stream, setStream] = useState<string>()

    useEffect(() => {
        let device = props.deviceMirrors.pop()
        if (device === undefined) return 

        const newSocket = appiumService.connectDevice(device)
        newSocket.onopen = (event: Event) => {
            console.log(`onOpen ${event}`)
        }
        newSocket.onmessage = (event: MessageEvent) => {
            console.log(`onMessage ${event}`)
            const img = URL.createObjectURL(event.data as Blob);
            setStream(img)  
        }

        socket = [...socket, newSocket]

    }, [props.deviceMirrors, props])

    return (
        <>
            <section>
                {stream &&
                    <DeviceInstance imageSource={stream}/>
                }
            </section>
        </>
    )
}