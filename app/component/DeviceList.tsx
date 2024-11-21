"use client" ;

import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect, useMemo, useState } from "react"
import { DeviceItem } from "./DeviceItem"

type DevicesUiState = 'loading'|'empty'|Array<DeviceModel[]>|Error 

export const DeviceList = () => {
    const [devices, setDevices] = useState<DeviceModel[]>()

    useEffect(() => {
        appiumService.getDevices()
        .then((result) => { 
            setDevices(result)
        }).catch(error => {

        })
    }, [])

    const useDevice = (device: DeviceModel) => {
        appiumService.createAppiumSession(device)
    }

    const deviceItems = useMemo(() => {
        return devices?.map((items) => 
            <DeviceItem 
                key={items.udid} 
                device={items}
                onUseButtonClicked={useDevice}
            />
        )
    }, [devices])

    return (
        <>
            <section 
                className="w-full grid grid-cols-5 gap-4"
            >
                {deviceItems}
            </section>
        </>
    )
}