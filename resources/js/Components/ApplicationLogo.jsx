export default function ApplicationLogo({height, width, className}) {
    return (
        <img
            src="/icon-100.png"
            className={"rounded-lg " + className}
            height={height}
            width={width}
        />
    );
}
