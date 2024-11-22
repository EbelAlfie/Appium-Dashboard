import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect, useMemo, useState } from "react"
import { DeviceItem } from "./DeviceItem"

type DeviceListProps = {
    devices: DeviceModel[],
    setDevices: (devices: DeviceModel[]) => void
    onUseDevice: (device: DeviceModel) => void
}

export const DeviceList = (props: DeviceListProps) => {

    useEffect(() => {
        appiumService.getDevices()
        .then((result) => {
            props.setDevices(result)
        }).catch(error => {

        })
    }, [])

    const deviceItems = useMemo(() => {
        return props.devices?.map((items) => 
            <DeviceItem 
                key={items.udid} 
                device={items}
                onUseButtonClicked={props.onUseDevice}
            />
        )
    }, [props.devices])

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