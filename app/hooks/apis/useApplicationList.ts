import { useApiManager } from "../../libs/apiManager";

export const useApllicationList = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, val]) => [key, String(val)])
    )
  ).toString();

  return useApiManager({
    method: "GET",
    path: `application/list?${queryString}`,
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("전문가 조회 자금 신청 목록 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("전문가 조회 자금 신청 목록 조회 실패:", error);
      },
    },
  }).getUseQuery;
};
