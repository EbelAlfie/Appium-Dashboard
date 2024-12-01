import { appiumService } from "@/api/AppiumService"
import { DeviceModel } from "@/domain/Device"
import { useEffect, useMemo } from "react"
import { DeviceItem } from "./device/DeviceItem"
import { DevicesError } from "./device/Error"
import { DevicesLoading } from "./device/Loading"
import { DeviceListContent } from "./device/ListContent"
import { Failed, Success, UiState } from "../base/UiState"

type DeviceListProps = {
    devices: DeviceListUiState,
    setDevices: (devices: DeviceListUiState) => void
    onUseDevice: (device: DeviceModel) => void
}

type Empty = { type: "empty" } 
const EmptyState: Empty = { type: "empty" } 

export type DeviceListUiState = UiState<DeviceModel[]> | Empty

export const DeviceList = (props: DeviceListProps) => {

    // useEffect(() => {
    //     appiumService.getDevices()
    //     .then((result) => {
    //         if (result.length <= 0) props.setDevices(EmptyState);
    //         else props.setDevices(Success(result))
    //     }).catch(error => {
    //         props.setDevices(Failed(error))
    //     })
    // }, [])

    const deviceItems = useMemo(() => {
        const deviceUiState = props.devices
        switch(deviceUiState.type) {
            case "loading":
                return <DevicesLoading />
            case "success":
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
            case "failed":
                return <DevicesError error={deviceUiState.error}/>
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