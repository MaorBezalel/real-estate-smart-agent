import { useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useDeviceType } from '@common/hooks';

import { fetchInitialData, fetchUpdatedData } from '@common/services/functions';

import { InitialRealEstateGetResponseDto, UpdatedRealEstateGetResponseDto } from '@common/data/dtos/responses.dto';

type UseFetchRealEstateDataResult = {
    query: UseQueryResult<InitialRealEstateGetResponseDto | UpdatedRealEstateGetResponseDto, Error>;
    searchId: string;
    setSearchId: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * A hook for fetching real estate data.
 *
 * @param {boolean} enabled - Controls when the query should execute.
 * @returns {UseFetchRealEstateDataResult} An object containing the query and the search ID.
 */
export default function useFetchRealEstateData(enabled: boolean): UseFetchRealEstateDataResult {
    const [searchId, setSearchId] = useState<string>('');
    const { isDesktop } = useDeviceType();
    const location = useLocation();

    const query = useQuery({
        queryKey: ['getRealEstateData'],
        queryFn: async () => {
            let data: InitialRealEstateGetResponseDto | UpdatedRealEstateGetResponseDto;

            if (!searchId) {
                data = await fetchInitialData(location.search, isDesktop);
                setSearchId(data.search_id);
            } else {
                data = await fetchUpdatedData(searchId);
            }

            return data;
        },

        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 10, // 10 seconds
        refetchIntervalInBackground: false,
        enabled,
    });

    return { query, searchId, setSearchId };
}
