import { appiumService } from "@/api/AppiumService"
import { useEffect } from "react"

export const DeviceMirror = () => {
    
    useEffect(() => {
        appiumService.connectDevice
    }, [])
    
    return (
        <></>
    )
}