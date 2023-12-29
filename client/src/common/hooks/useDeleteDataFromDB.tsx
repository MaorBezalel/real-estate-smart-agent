import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDataWithAxios, deleteDataWithBeacon } from '../services';

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
    const queryClient = useQueryClient();
    const mutation = useMutation({ mutationFn: () => deleteDataWithAxios(searchId) });

    const deleteDataExplicitly = () => {
        mutation.mutate();
        setSearchId('');
        queryClient.clear();
    };
    const deleteDataImplicitly = () => deleteDataWithBeacon(searchId);

    return { deleteDataExplicitly, deleteDataImplicitly };
}