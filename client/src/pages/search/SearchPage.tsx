import Heading from './components/Heading';

import Dropbox from './components/input/Dropbox';
import InputField from './components/input/InputField';
import SumbitButton from './components/input/SumbitButton';

import RealEstateItem from './components/output/RealEstateItem';

import { useForm } from 'react-hook-form';

export default function SearchPage(): React.JSX.Element {
    //const { register, handleSubmit } = useForm();

    return (
        <main
            className="container mx-auto flex flex-1 flex-col place-items-center gap-4 px-4 pt-4 
            mobile-md:gap-6
            tablet-sm:gap-7
            laptop-md:gap-10"
        >
            <Heading />
            <form
                className="flex w-full flex-col justify-center gap-3
                tablet-sm:grid tablet-sm:grid-cols-2
                tablet-sm:gap-4
                tablet-lg:flex tablet-lg:flex-row tablet-lg:items-center tablet-lg:justify-center tablet-lg:gap-4
                laptop-md:gap-5"
                id="search-form"
            >
                <Dropbox />
                <InputField
                    state="city-search"
                    id="city"
                    placeholder="עיר..."
                    type="text"
                    inputMode="search"
                />
                <InputField
                    state="min-price"
                    id="city"
                    placeholder="עיר..."
                    type="text"
                    inputMode="numeric"
                    min={0}
                />
                <InputField
                    state="max-price"
                    id="city"
                    placeholder="עיר..."
                    type="text"
                    inputMode="numeric"
                    max={1_000_000_000}
                />
                <SumbitButton />
            </form>

            <output
                className="flex h-full w-full flex-col"
                htmlFor="search-form"
            >
                <ul className="flex h-full w-full flex-col gap-4">
                    <RealEstateItem
                        linkToken="24j6yk8q"
                        price="1,500,000 ₪"
                        lastUpdated={new Date('2021-08-01 12:00:00')}
                        estateType="דירה"
                        rooms={2}
                        floor={3}
                        area={80}
                        street="מבצע סיני 29"
                        neighborhood="רמת יוסף"
                        city="בת ים"
                    />
                </ul>
            </output>
        </main>
    );
}
