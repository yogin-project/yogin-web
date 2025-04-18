import { useApiManager } from "../../libs/apiManager";

export const useCompanyApplication = () => {
  return useApiManager({
    method: "POST",
    path: "company/application",

    mutationOption: {
      onSuccess: (data: any) => {
        console.log("자금조달신청 임시 저장 성공:", data);
      },
      onError: (error: any) => {
        console.error("자금조달신청 임시 저장 실패:", error);
      },
    },
  }).setUseMutation;
};
