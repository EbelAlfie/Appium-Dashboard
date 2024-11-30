import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect, useMemo, useState } from "react"
import { DeviceItem } from "./DeviceItem"

type DeviceListProps = {
    devices: DeviceListUiState,
    setDevices: (devices: DeviceListUiState) => void
    onUseDevice: (device: DeviceModel) => void
}

type Loading = { type:"loading" }
type Empty = { type:"empty" } 
type Success = { type: "success", data: DeviceModel[] }
type Failed = { type: "failed", error: Error }

export type DeviceListUiState = Loading|Empty|Success|Failed

export const DeviceList = (props: DeviceListProps) => {

    useEffect(() => {
        appiumService.getDevices()
        .then((result) => {
            if (result.length <= 0) props.setDevices({type: 'empty'});
            else props.setDevices({ type: "success", data: result })
        }).catch(error => {
            props.setDevices({ type: "failed", error: error })
        })
    }, [])

    const deviceItems = useMemo(() => {
        const deviceUiState = props.devices
        switch(deviceUiState.type) {
            case 'loading':
                return <p>loading cuy</p>
            case 'success':
                return deviceUiState?.data.map((items) => 
                    <DeviceItem 
                        key={items.udid} 
                        device={items}
                        onUseButtonClicked={props.onUseDevice}
                    />
                )
            case 'empty':
                return <p>Empty</p>
            default:
                return <p>Hehe</p>
        }
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