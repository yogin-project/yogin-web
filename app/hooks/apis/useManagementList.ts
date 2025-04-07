import { useApiManager } from "../../libs/apiManager";

export const useManagementList = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, val]) => [key, String(val)])
    )
  ).toString();

  return useApiManager({
    method: "GET",
    path: `management?${queryString}`,
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("매니지먼트 리스트 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("매니지먼트 리스트 조회 실패:", error);
      },
    },
  }).getUseQuery;
};
