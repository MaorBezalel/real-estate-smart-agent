export default function Heading(): React.JSX.Element {
    return (
        <h1
            className="text-center text-[2.5rem] font-extrabold text-primary underline underline-offset-4 antialiased mobile-md:text-5xl mobile-lg:text-[3.5rem] tablet-md:text-6xl tablet-lg:text-start tablet-lg:text-[3.5rem] laptop-sm:text-6xl laptop-md:text-7xl laptop-lg:text-[4.5rem]"
            style={{
                textShadow:
                    '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
            }}
        >
            חיפוש נדל"ן:
        </h1>
    );
}
