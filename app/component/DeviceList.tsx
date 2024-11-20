import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect, useMemo, useState } from "react"
import { DeviceItem } from "./DeviceItem"

export const DeviceList = () => {
    const [devices, setDevices] = useState<DeviceModel[]>()

    useEffect(() => {
        appiumService.getDevices()
        .then((result) => { //: DeviceModel[]
            setDevices(result)
        }).catch(error => {

        })
    }, [])

    const deviceItems = useMemo(() => {
        return devices?.map((items) => <DeviceItem device={items}/>)
    }, [devices])

    return (
        <div>
            {deviceItems}
        </div>
    )
}