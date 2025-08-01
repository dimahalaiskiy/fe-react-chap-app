import axios, { AxiosRequestConfig } from "axios";

interface PaginationState {
  skip: number | null;
  limit: number;
  total: number;
  loading: boolean;
  items: any[];
  query?: string;
}

interface PaginationResponse {
  rows: any[];
  pagination: {
    total: number;
    limit: number;
    skip: number | null;
  };
}

/**
 * Creates a base API instance with default config
 */
export const createApiInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Handles infinite scroll pagination for API requests
 * @param url - The API endpoint URL
 * @param state - Current pagination state
 * @param params - Additional query parameters
 * @param config - Axios request configuration
 * @returns Updated pagination state
 */
export const fetchPaginatedData = async (
  url: string,
  state: PaginationState,
  params: Record<string, any> = {},
  config: AxiosRequestConfig = {},
): Promise<PaginationState> => {
  try {
    // If skip is null, we've reached the end of the data
    if (state.skip === null) {
      return state;
    }

    // Set loading state
    const loadingState = { ...state, loading: true };

    // Prepare query parameters
    const queryParams = {
      skip: state.skip,
      limit: state.limit,
      ...params,
    };

    if (state.query) {
      queryParams.query = state.query;
    }

    // Make the API request
    const response = await axios.get<PaginationResponse>(url, {
      params: queryParams,
      ...config,
    });

    const { rows, pagination } = response.data;

    // Return updated state
    return {
      skip: pagination.skip, // Next skip value or null if no more data
      limit: pagination.limit,
      total: pagination.total,
      loading: false,
      items: state.skip === 0 ? rows : [...state.items, ...rows],
      query: state.query,
    };
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    return { ...state, loading: false };
  }
};

/**
 * Hook for handling scroll event for infinite loading
 * @param callback - Function to call when scroll threshold is reached
 * @param threshold - Distance from bottom to trigger callback (default: 200px)
 */
export const setupInfiniteScroll = (callback: () => void, threshold = 200): (() => void) => {
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      callback();
    }
  };

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};

/**
 * Creates initial pagination state
 */
export const createInitialPaginationState = (limit = 10): PaginationState => ({
  skip: 0,
  limit,
  total: 0,
  loading: false,
  items: [],
});
