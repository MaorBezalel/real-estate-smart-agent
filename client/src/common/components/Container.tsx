type ContainerProps = {
    className?: string;
    children: React.ReactNode;
};

function Container({ className, children }: ContainerProps): React.JSX.Element {
    return <div className={className}>{children}</div>;
}

export default Container;
