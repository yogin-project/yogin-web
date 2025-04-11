import { useApiManager } from "../../libs/apiManager";

export const useCompanyApplicationCancel = () => {
  return useApiManager({
    method: "POST",
    path: "company/application/cancel",

    mutationOption: {
      onSuccess: (data: any) => {
        console.log("자금조달신청 삭제 성공:", data);
      },
      onError: (error: any) => {
        console.error("자금조달신청 삭제 실패:", error);
      },
    },
  }).setUseMutation;
};
