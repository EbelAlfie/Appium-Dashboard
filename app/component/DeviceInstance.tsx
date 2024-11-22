type DeviceProps = {
    imageSource: string
}

const DeviceInstance = (props: DeviceProps) => {
    return (
        <div className="">
            <img src={props.imageSource} />
        </div>
    )
}