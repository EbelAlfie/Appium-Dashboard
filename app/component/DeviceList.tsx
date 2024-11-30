import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect, useMemo } from "react"
import { DeviceItem } from "./device/DeviceItem"
import { DevicesError } from "./device/Error"
import { DevicesLoading } from "./device/Loading"
import { DeviceListContent } from "./device/ListContent"

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
                return <DevicesLoading />
            case 'success':
                return <DeviceListContent>
                    {deviceUiState?.data.map((items) => 
                        <DeviceItem 
                            key={items.udid} 
                            device={items}
                            onUseButtonClicked={props.onUseDevice}
                        />
                    )}
                </DeviceListContent>
            case 'empty':
                return <p>Empty</p>
            case 'failed':
                return <DevicesError />
        }
    }, [props.devices])

    return (
        <>
            <section>
                {deviceItems}
            </section>
        </>
    )
}