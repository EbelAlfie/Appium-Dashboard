import { DeviceModel } from "@/domain/Device"
import { DeviceList, DeviceListUiState } from "./DeviceList"
import { Devices } from "./DeviceMirrors"
import { useState } from "react"
import { appiumService } from "@/api/AppiumService"

export const DevicesManager = () => {
    const [devices, setDevices] = useState<DeviceListUiState>({ type: 'loading' })
    const [deviceMirrors, addMirror] = useState<DeviceModel[]>([])

    const useDevice = (device: DeviceModel) => {
        appiumService.createAppiumSession(device)
            .then(result => {
                console.log("Success create session")
                
                addMirror([...deviceMirrors, device])
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <section>
            <DeviceList 
                devices={devices}
                setDevices={setDevices}
                onUseDevice={useDevice} 
            />
            <Devices
                deviceMirrors={deviceMirrors}
            />
        </section>
    )
}