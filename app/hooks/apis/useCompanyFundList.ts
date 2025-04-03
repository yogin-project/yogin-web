import { useApiManager } from "../../libs/apiManager";

export const useCompanyFundList = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, val]) => [key, String(val)])
    )
  ).toString();

  return useApiManager({
    method: "GET",
    path: `company/application/list?${queryString}`,
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("유저 정보 리스트 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("유저 정보 리스트 조회 실패:", error);
      },
    },
  }).getUseQuery;
};
