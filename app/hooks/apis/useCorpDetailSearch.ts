import { useApiManager } from "@/app/libs/apiManager";

export const useCorpDetailSearch = (applicationId?: any) => {
  return useApiManager({
    method: "GET",
    path: `application/${applicationId}/corp`,
    queryOption: {
      enabled: false, // 자동 호출 막기
    },
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("전문가 자금 신청 상세 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("전문가 자금 신청 상세 조회 실패:", error);
      },
    },
  }).getUseQuery;
};
