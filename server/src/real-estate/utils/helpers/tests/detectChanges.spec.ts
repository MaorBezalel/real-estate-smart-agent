import { RealEstate } from "../../dtos/real-estate.dto";
import { detectChanges } from "..";

describe("detectChanges", () => {
    it(`should return the array with a item that have 'status' property set to 'default'
        when that item is in both oldData and newData arrays with the same properties`, () => {
        // Setup
        const [oldData, newData] = fakeOldAndNewData1();

        // Pre Assert
        expect(oldData[0]).toStrictEqual(newData[0]);

        // Expect
        const expected = expectedNewDataToBeDefault();

        // Action
        const result = detectChanges(oldData, newData);

        // Post Assert
        expect(result).toStrictEqual(expected);
    });

    it(`should return the array with a item that have 'status' property set to 'updated'
        when that item is in both oldData and newData arrays with different 'updatedAt' property`, () => {
        // Setup
        const [oldData, newData] = fakeOldAndNewData2();

        // Pre Assert
        expect(oldData[0].updatedAt).not.toBe(newData[0].updatedAt);

        // Expect
        const expected = expectedNewDataToBeUpdated();

        // Action
        const result = detectChanges(oldData, newData);

        // Post Assert
        expect(result).toStrictEqual(expected);
    });

    it(`should return the array with a item that have 'status' property set to 'new'
        when that item is in newData array but not in oldData array`, () => {
        // Setup
        const [oldData, newData] = fakeOldAndNewData3();

        // Pre Assert
        expect(oldData[0].linkToken).not.toBe(newData[0].linkToken);

        // Expect
        const expected = expectedNewDataToBeNew();

        // Action
        const result = detectChanges(oldData, newData);

        // Post Assert
        expect(result).toStrictEqual(expected);
    });

    it('should return the array with the correct "status" property for all the scenarios above at once', () => {
        // Setup
        const [oldData, newData] = fakeOldAndNewData();

        // Pre Assert
        expect(oldData[0].updatedAt).not.toBe(newData[0].updatedAt);
        expect(oldData[1].linkToken).not.toBe(newData[1].linkToken);
        expect(oldData[2]).toStrictEqual(newData[2]);

        // Expect
        const expected = expectedNewData();

        // Action
        const result = detectChanges(oldData, newData);

        // Post Assert
        expect(result).toStrictEqual(expected);
    });
});

const fakeOldAndNewData1 = (): [RealEstate[], RealEstate[]] => {
    const oldData: RealEstate[] = [
        {
            status: 'default',
            linkToken: 'qk0s7rss',
            estateType: 'דירה',
            street: 'שדרות הבעש"ט 9',
            neighborhood: 'רמת אביב',
            city: 'תל אביב יפו',
            rooms: 1.5,
            floor: 'קרקע',
            squareMeters: 27,
            updatedAt: '2021-08-02 11:30:55',
            price: '1,750,000 ₪'
        }
    ];

    const newData: RealEstate[] = [
        {
            status: 'default',
            linkToken: 'qk0s7rss',
            estateType: 'דירה',
            street: 'שדרות הבעש"ט 9',
            neighborhood: 'רמת אביב',
            city: 'תל אביב יפו',
            rooms: 1.5,
            floor: 'קרקע',
            squareMeters: 27,
            updatedAt: '2021-08-02 11:30:55',
            price: '1,750,000 ₪'
        }
    ];

    return [oldData, newData];
}
const expectedNewDataToBeDefault = (): RealEstate[] => [
    {
        status: 'default',
        linkToken: 'qk0s7rss',
        estateType: 'דירה',
        street: 'שדרות הבעש"ט 9',
        neighborhood: 'רמת אביב',
        city: 'תל אביב יפו',
        rooms: 1.5,
        floor: 'קרקע',
        squareMeters: 27,
        updatedAt: '2021-08-02 11:30:55',
        price: '1,750,000 ₪'
    }
];

const fakeOldAndNewData2 = (): [RealEstate[], RealEstate[]] => {
    const oldData: RealEstate[] = [
        {
            status: 'default',
            linkToken: 'vmurovih',
            estateType: 'דירה',
            street: 'הרצל 1',
            neighborhood: 'רמת יוסף',
            city: 'רמת גן',
            rooms: 3,
            floor: 2,
            squareMeters: 80,
            price: '1,000,000 ₪',
            updatedAt: '2021-08-01 12:00:00'
        }
    ];

    const newData: RealEstate[] = [
        {
            // Should be updated
            status: 'default',
            linkToken: 'vmurovih',
            estateType: 'דירה',
            street: 'הרצל 1',
            neighborhood: 'רמת יוסף',
            city: 'רמת גן',
            rooms: 3,
            floor: 2,
            squareMeters: 80,
            price: '1,100,000 ₪',
            updatedAt: '2021-08-01 16:10:00'
        },
    ];

    return [oldData, newData];
}
const expectedNewDataToBeUpdated = (): RealEstate[] => [
    {
        status: 'updated',
        linkToken: 'vmurovih',
        estateType: 'דירה',
        street: 'הרצל 1',
        neighborhood: 'רמת יוסף',
        city: 'רמת גן',
        rooms: 3,
        floor: 2,
        squareMeters: 80,
        price: '1,100,000 ₪',
        updatedAt: '2021-08-01 16:10:00'
    },
];

const fakeOldAndNewData3 = (): [RealEstate[], RealEstate[]] => {
    const oldData: RealEstate[] = [
        {
            status: 'default',
            linkToken: 'ewfjwef',
            estateType: 'דירה',
            street: 'סוקולוב 40',
            neighborhood: 'אגרובנק',
            city: 'חולון',
            rooms: 4,
            floor: 3,
            squareMeters: 110,
            price: '2,500,000 ₪',
            updatedAt: '2021-08-01 12:05:00'
        },
    ];

    const newData: RealEstate[] = [
        {
            status: 'default',
            linkToken: 'yfjwef',
            estateType: 'דירה',
            street: 'אנה פרנק 40',
            neighborhood: 'אגרובנק',
            city: 'בת ים',
            rooms: 4,
            floor: 'קרקע',
            squareMeters: 120,
            price: '3,500,000 ₪',
            updatedAt: '2020-10-06 16:25:00'
        },

    ];

    return [oldData, newData];
}
const expectedNewDataToBeNew = (): RealEstate[] => [
    {
        status: 'new',
        linkToken: 'yfjwef',
        estateType: 'דירה',
        street: 'אנה פרנק 40',
        neighborhood: 'אגרובנק',
        city: 'בת ים',
        rooms: 4,
        floor: 'קרקע',
        squareMeters: 120,
        price: '3,500,000 ₪',
        updatedAt: '2020-10-06 16:25:00'
    },
];

const fakeOldAndNewData = (): [RealEstate[], RealEstate[]] => {
    const oldData: RealEstate[] = [{
        status: 'default',
        linkToken: 'vmurovih',
        estateType: 'דירה',
        street: 'הרצל 1',
        neighborhood: 'רמת יוסף',
        city: 'רמת גן',
        rooms: 3,
        floor: 2,
        squareMeters: 80,
        price: '1,000,000 ₪',
        updatedAt: '2021-08-01 12:00:00'
    },
    {
        status: 'default',
        linkToken: 'ewfjwef',
        estateType: 'דירה',
        street: 'סוקולוב 40',
        neighborhood: 'אגרובנק',
        city: 'חולון',
        rooms: 4,
        floor: 3,
        squareMeters: 110,
        price: '2,500,000 ₪',
        updatedAt: '2021-08-01 12:05:00'
    },
    {
        status: 'default',
        linkToken: 'qk0s7rss',
        estateType: 'דירה',
        street: 'שדרות הבעש"ט 9',
        neighborhood: 'רמת אביב',
        city: 'תל אביב יפו',
        rooms: 1.5,
        floor: 'קרקע',
        squareMeters: 27,
        updatedAt: '2021-08-02 11:30:55',
        price: '1,750,000 ₪'
    }]

    const newData: RealEstate[] = [{
        status: 'default',
        linkToken: 'vmurovih',
        estateType: 'דירה',
        street: 'הרצל 1',
        neighborhood: 'רמת יוסף',
        city: 'רמת גן',
        rooms: 3,
        floor: 2,
        squareMeters: 80,
        price: '1,100,000 ₪',
        updatedAt: '2021-08-01 16:10:00'
    },
    {
        status: 'default',
        linkToken: 'yfjwef',
        estateType: 'דירה',
        street: 'אנה פרנק 40',
        neighborhood: 'אגרובנק',
        city: 'בת ים',
        rooms: 4,
        floor: 'קרקע',
        squareMeters: 120,
        price: '3,500,000 ₪',
        updatedAt: '2020-10-06 16:25:00'
    },
    {
        status: 'default',
        linkToken: 'qk0s7rss',
        estateType: 'דירה',
        street: 'שדרות הבעש"ט 9',
        neighborhood: 'רמת אביב',
        city: 'תל אביב יפו',
        rooms: 1.5,
        floor: 'קרקע',
        squareMeters: 27,
        updatedAt: '2021-08-02 11:30:55',
        price: '1,750,000 ₪'
    }]

    return [oldData, newData];
}

const expectedNewData = (): RealEstate[] => [{
    // Should be updated
    status: 'updated',
    linkToken: 'vmurovih',
    estateType: 'דירה',
    street: 'הרצל 1',
    neighborhood: 'רמת יוסף',
    city: 'רמת גן',
    rooms: 3,
    floor: 2,
    squareMeters: 80,
    price: '1,100,000 ₪',
    updatedAt: '2021-08-01 16:10:00'
},
{
    // Should be new
    status: 'new',
    linkToken: 'yfjwef',
    estateType: 'דירה',
    street: 'אנה פרנק 40',
    neighborhood: 'אגרובנק',
    city: 'בת ים',
    rooms: 4,
    floor: 'קרקע',
    squareMeters: 120,
    price: '3,500,000 ₪',
    updatedAt: '2020-10-06 16:25:00'
},
{
    // Should stay the same (status: 'default')
    status: 'default',
    linkToken: 'qk0s7rss',
    estateType: 'דירה',
    street: 'שדרות הבעש"ט 9',
    neighborhood: 'רמת אביב',
    city: 'תל אביב יפו',
    rooms: 1.5,
    floor: 'קרקע',
    squareMeters: 27,
    updatedAt: '2021-08-02 11:30:55',
    price: '1,750,000 ₪'
}]