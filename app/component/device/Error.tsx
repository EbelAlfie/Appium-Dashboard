type ErrorProps = {
    error: Error
}

export const DevicesError = (props: ErrorProps) => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <h2>{props.error.message}</h2>
        </div>
    )
}