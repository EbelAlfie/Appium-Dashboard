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
        
        appiumService.connectDevice(latest)
        .then(result => {

        })
        .catch(error => {

        })
    }, [props])
    
    return (
        <>
            <section>
                {/* {props.deviceMirrors} */}
            </section>
        </>
    )
}