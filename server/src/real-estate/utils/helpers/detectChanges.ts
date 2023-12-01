import { RealEstate } from '../dtos/real-estate.dto';

/**
 * Detects changes between oldData and newData arrays of RealEstate object and returns an
 * array of RealEstate objects with the correct "status" property
 * @param {RealEstate[]} oldData - The array of old RealEstate objects.
 * @param {RealEstate[]} newData - The array of new RealEstate objects.
 * @returns {RealEstate[]} An array of RealEstate objects with the correct "status" property.
 */
export const detectChanges = (oldData: RealEstate[], newData: RealEstate[]): RealEstate[] => {
    const oldDataMap = new Map<typeof RealEstate.prototype.linkToken, RealEstate>(oldData.map(item => [item.linkToken, item]));

    return newData.map(item => {
        const isNew = !oldDataMap.has(item.linkToken);
        if (isNew) return { ...item, status: 'new' };

        const oldItem = oldDataMap.get(item.linkToken);
        const isUpdated = oldItem.updatedAt !== item.updatedAt;
        if (isUpdated) return { ...item, status: 'updated' };

        return { ...item, status: 'default' };
    });
}