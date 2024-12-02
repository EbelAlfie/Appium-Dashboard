type DeviceProps = {
    imageSource: string
}

export const DeviceInstance = (props: DeviceProps) => {
    return (
        <div>
            <img src={props.imageSource} />
        </div>
    )
}