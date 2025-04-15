import { useApiManager } from "../../libs/apiManager";

export const useGetPush = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, val]) => [key, String(val)])
    )
  ).toString();

  return useApiManager({
    method: "GET",
    path: `push?${queryString}`,
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("알림 리스트 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("알림 리스트 조회 실패:", error);
      },
    },
  }).getUseQuery;
};
