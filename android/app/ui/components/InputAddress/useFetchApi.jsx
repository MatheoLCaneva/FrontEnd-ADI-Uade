import { useEffect, useCallback, useState } from "react";

const GEOAPIFY_API_KEY = "apiKey=e2307f866ff64c19afec2a46c4c60bcf";
const BASE_URL = "https://api.geoapify.com/v1";

const useFetchAPI = (request, params) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (params === "empty") return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${BASE_URL}${request}${params}$type=amenity&${GEOAPIFY_API_KEY}`
            );
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    }, [params]);

    useEffect(() => {
        // 1 sec after user stopped typing
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
};

export default useFetchAPI;