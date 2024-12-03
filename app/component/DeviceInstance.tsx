type DeviceProps = {
    imageSource: string
}

export const DeviceInstance = (props: DeviceProps) => {
    return (
        <div>
            <img 
                className="h-[720px] w-[720px]"
                src={props.imageSource} 
            />
        </div>
    )
}