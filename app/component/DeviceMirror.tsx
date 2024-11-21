import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect } from "react"

type DeviceMirrorProps = {
    deviceMirrors: Array<DeviceModel>
}

export const DeviceMirror = (props: DeviceMirrorProps) => {

    useEffect(() => {
        const latest = props.deviceMirrors?.pop()
        if (latest === undefined) return 
        console.log("LLL")
        
        appiumService.connectDevice(latest)
        .then(result => {

        })
        .catch(error => {

        })
    }, [props.deviceMirrors])
    
    return (
        <>
            <section>
                {/* {props.deviceMirrors} */}
            </section>
        </>
    )
}