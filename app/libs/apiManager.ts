import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiClient } from "./apiClient";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  queryKey?: string;
  queryOption?: any;
  mutationOption?: any;
  headers?: any;
  params?: any;
  paramsPath?: string;
  body?: any;
};

type ApiResponse = any;

export const useApiManager = ({
  method = "GET",
  path,
  queryKey,
  queryOption = {},
  mutationOption = {},
  ...others
}: ApiOptions) => {
  const queryClient = useQueryClient();

  // ✅ 공통 API 요청 함수
  const request = async (options: ApiOptions): Promise<ApiResponse> => {
    return apiClient(options);
  };

  // ✅ 자동 실행되는 useQuery (GET 요청)
  const getUseQuery: UseQueryResult<ApiResponse> = useQuery({
    queryKey: queryKey ? [queryKey, others.params] : [path, others.params],
    queryFn: () => request({ method, path, ...others }),
    enabled: method === "GET",
    refetchOnWindowFocus: false, // 포커스 변경 시 자동 refetch 방지
    ...queryOption,
  });

  // ✅ useLazyQuery (수동 실행)
  const useLazyQuery = () => {
    return async (params?: object) => {
      return await queryClient.fetchQuery({
        queryKey: [path, params],
        queryFn: () => request({ method: "GET", path, ...others, params }),
      });
    };
  };

  // ✅ useMutation (POST, PUT, DELETE, PATCH 요청)
  const setUseMutation: UseMutationResult<ApiResponse, unknown, any> =
    useMutation({
      mutationFn: (props: any) =>
        request({ method, path, ...others, ...props }),
      onError: (error: any) => console.error("Mutation Error:", error?.message),
      ...mutationOption,
    });

  return {
    request,
    getUseQuery,
    useLazyQuery,
    setUseMutation,
  };
};
