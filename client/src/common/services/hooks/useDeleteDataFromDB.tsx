import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';

import { deleteDataWithAxios, deleteDataWithBeacon } from '@common/services/functions';

type UseDeleteDataFromDBResult = {
    deleteDataExplicitly: () => void;
    deleteDataImplicitly: () => void;
};

/**
 * A hook for managing data deletion from the database.
 *
 * @param {string} searchId - The ID of the search to delete.
 * @param {Dispatch<SetStateAction<string>>} setSearchId - A function to update the search ID.
 * @returns {UseDeleteDataFromDBResult} An object containing the mutation.
 */
export default function useDeleteDataFromDB(
    searchId: string,
    setSearchId: Dispatch<SetStateAction<string>>
): UseDeleteDataFromDBResult {
    const mutation = useMutation({ mutationFn: () => deleteDataWithAxios(searchId) });

    const deleteDataExplicitly = () => {
        mutation.mutate();
        setSearchId('');
    };
    const deleteDataImplicitly = () => deleteDataWithBeacon(searchId);

    return { deleteDataExplicitly, deleteDataImplicitly };
}
