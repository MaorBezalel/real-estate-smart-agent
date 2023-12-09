import { useState } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult,
    QueryClient,
} from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useOnUnmount, useEventListener } from '../hooks';

import axios from 'axios';

import {
    InitialRealEstateGetResponseDto,
    UpdatedRealEstateGetResponseDto,
} from '../utils/dtos/responses.dto';

type UseSmartAgentResult = {
    query: UseQueryResult<
        InitialRealEstateGetResponseDto | UpdatedRealEstateGetResponseDto,
        Error
    >;
    mutation: UseMutationResult<void, Error, void, unknown>;
    queryClient: QueryClient;
};

/**
 * Custom hook for managing smart agent functionality.
 *
 * @param {number} refetchInterval The interval (in milliseconds) at which the query should be refetched.
 * @returns {UseSmartAgentResult} An object containing the query, mutation, and query client.
 */
export default function useSmartAgent(
    refetchInterval: number
): UseSmartAgentResult {
    const queryClient = useQueryClient();
    const [searchId, setSearchId] = useState<string>('');
    const location = useLocation();

    const query = useQuery({
        queryKey: ['getRealEstateData'],
        queryFn: async () => {
            if (!searchId) {
                const url: string =
                    import.meta.env.VITE_API_ORIGIN +
                    import.meta.env.VITE_API_SEARCH_PATHNAME +
                    location.search;
                const response =
                    await axios.get<InitialRealEstateGetResponseDto>(url);
                setSearchId(response.data.search_id);
                return response.data;
            }
            const endpoint: string = `?searchId=${searchId}`;
            const url: string =
                import.meta.env.VITE_API_ORIGIN +
                import.meta.env.VITE_API_UPDATE_PATHNAME +
                endpoint;
            const response =
                await axios.get<UpdatedRealEstateGetResponseDto>(url);
            return response.data;
        },
        refetchOnWindowFocus: false,
        refetchInterval,
        refetchIntervalInBackground: false,
    });
    const mutation = useMutation({
        mutationKey: ['deleteRealEstateData'],
        mutationFn: async () => {
            if (!searchId) return;
            const endpoint: string = `?searchId=${searchId}`;
            const url: string =
                import.meta.env.VITE_API_ORIGIN +
                import.meta.env.VITE_API_CANCEL_PATHNAME +
                endpoint;
            await axios.delete(url);
        },
    });

    // Fires when `isSubmitSuccessful` in `SearchPageContext` is set to false
    // (specifically, when the user cancel the search via the cancel button).
    useOnUnmount(() => {
        mutation.mutate();
        queryClient.clear();
    });

    // Fires when the user either closes the tab, navigates away from the page, or refreshes the page.
    useEventListener('unload', () => {
        navigator.sendBeacon(
            import.meta.env.VITE_API_ORIGIN +
                import.meta.env.VITE_API_CANCEL_UPON_SEND_BEACON_PATHNAME +
                `?searchId=${searchId}`,
            JSON.stringify({ searchId: searchId })
        );
    });

    return {
        query,
        mutation,
        queryClient,
    };
}
