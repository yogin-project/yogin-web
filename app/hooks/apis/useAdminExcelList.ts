import { useApiManager } from "../../libs/apiManager";

export const useAdminExcelLazyQuery = () => {
  return useApiManager({
    method: "GET",
    path: "admin/user/list/excel",
    isRawResponse: true, // 🔹 원시 응답을 반환하도록 명시
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("유저 정보 엑셀 리스트 조회 성공 (lazy):", data);
      },
      onError: (error: any) => {
        console.error("유저 정보 엑셀 리스트 조회 실패 (lazy):", error);
      },
    },
  }).useLazyQuery();
};
