type ErrorProps = {
    warningMessage: string
}

export const DevicesError = (props: ErrorProps) => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            {/* Image */}
            <p className="text-2xl font-bold">{props.warningMessage}</p>
        </div>
    )
}