export default function SumbitButton(): React.JSX.Element {
    return (
        <button
            className="inline-block w-full place-self-center rounded-2xl border-4 border-solid border-text bg-primary py-3 text-center text-xl font-extrabold text-background drop-shadow-xl duration-200 hover:scale-110 hover:filter hover:ease-in-out focus:brightness-110 
        mobile-md:text-2xl
        tablet-sm:col-span-2 tablet-sm:h-[5rem] tablet-sm:w-[20rem] tablet-sm:py-0 tablet-sm:text-3xl
        tablet-lg:h-auto tablet-lg:w-[8rem] tablet-lg:py-2 tablet-lg:text-xl
        laptop-sm:text-2xl
        laptop-md:text-3xl"
            id="sumbit-btn"
            type="submit"
        >
            הפעל
        </button>
    );
}
