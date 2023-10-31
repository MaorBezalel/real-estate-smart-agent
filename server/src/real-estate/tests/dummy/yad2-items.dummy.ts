import { Yad2RealEstateItem, Yad2AdvertisementItem } from "src/real-estate/types/yad2.responses";

export const dummyYad2AdvertisementItems = (): Yad2AdvertisementItem[] => [
    {
        type: 'advertisement',
    },
    {
        type: 'advertisement',
    },
    {
        type: 'advertisement',
    },
    {
        type: 'advertisement',
    }
];

export const dummyYad2RealEstateItems = (): Yad2RealEstateItem[] => [
    {
        id: 'lpoc1l9r',
        title_1: 'סומקן 26',
        title_2: 'דירה',
        highlight_text: '',
        price: '1,900,000 ₪',
        date: new Date("2023-10-27 14:10:27"),
        row_4: [
            {
                label: 'חדרים',
                value: 2.5
            },
            {
                label: 'קומה',
                value: 1
            },
            {
                label: 'מ"ר',
                value: 60
            }
        ]
    },
    {
        id: 'qk0s7rss',
        title_1: 'שדרות הבעש"ט 9',
        title_2: 'דירה',
        highlight_text: '',
        price: '1,750,000 ₪',
        date: new Date("2023-10-27 14:00:55"),
        row_4: [
            {
                label: 'חדרים',
                value: 1.5
            },
            {
                label: 'קומה',
                value: 1
            },
            {
                label: 'מ"ר',
                value: 27
            }
        ]
    },
    {
        id: 'e1fw2lzh',
        title_1: 'חנוך 4',
        title_2: 'בית פרטי/קוטג\'',
        highlight_text: '',
        price: '1,450,000 ₪',
        date: new Date("2023-10-27 06:20:16"),
        row_4: [
            {
                label: 'חדרים',
                value: 2.5
            },
            {
                label: 'קומה',
                value: 'קרקע'
            },
            {
                label: 'מ"ר',
                value: 35
            }
        ]
    },
    {
        id: 'ah2t2l1h',
        title_1: 'שושנה 4',
        title_2: 'בית פרטי/קוטג\'',
        highlight_text: 'תיווך',
        price: '2,500,000 ₪',
        date: new Date("2023-10-27 07:20:16"),
        row_4: [
            {
                label: 'חדרים',
                value: 4.5
            },
            {
                label: 'קומה',
                value: 'קרקע'
            },
            {
                label: 'מ"ר',
                value: 100
            }
        ]
    }
];
