import { DeviceModel } from "@/domain/Device"
import { DeviceList } from "./DeviceList"
import { DeviceMirror } from "./DeviceMirror"
import { useState } from "react"
import { appiumService } from "@/api/AppiumService"

export const DevicesManager = () => {
    const [devices, setDevices] = useState<DeviceModel[]>(null!)
    const [deviceMirrors, addMirror] = useState<DeviceModel[]>(null!)

    const useDevice = (device: DeviceModel) => {
        appiumService.createAppiumSession(device)
            .then(result => {
                console.log("Success create session")
                console.log(result)
                const newList = deviceMirrors
                newList.push(device)
                
                addMirror(newList)
            }).catch(error => {

            })
    }

    return (
        <section>
            <DeviceList 
                devices={devices}
                setDevices={setDevices}
                onUseDevice={useDevice} 
            />
            <DeviceMirror 
                deviceMirrors={deviceMirrors}
            />
        </section>
    )
}