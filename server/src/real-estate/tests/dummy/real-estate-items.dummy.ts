import { RealEstate } from "../../dtos/real-estate.item.dto";

export const dummyRealEstateItems = (): RealEstate[] => [
    {
        id: "lpoc1l9r",
        type: "דירה",
        street: "סומקן 26",
        neighborhood: 'נווה צדק',
        city: 'תל אביב יפו',
        rooms: 2.5,
        floor: 1,
        squareMeters: 60,
        updatedAt: new Date("2023-10-27 14:10:27"),
        price: "1,900,000 ₪"
    },
    {
        id: "qk0s7rss",
        type: "דירה",
        street: "שדרות הבעש\"ט 9",
        neighborhood: 'רמת יוסף',
        city: 'תל אביב יפו',
        rooms: 1.5,
        floor: 1,
        squareMeters: 27,
        updatedAt: new Date("2023-10-27 14:00:55"),
        price: "1,750,000 ₪"
    },
    {
        id: "e1fw2lzh",
        type: "בית פרטי/קוטג'",
        street: "חנוך 4",
        neighborhood: 'אגרובנק',
        city: 'תל אביב יפו',
        rooms: 2.5,
        floor: "קרקע",
        squareMeters: 35,
        updatedAt: new Date("2023-10-27 06:20:16"),
        price: "1,450,000 ₪"
    },
];