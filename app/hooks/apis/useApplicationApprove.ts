import { useApiManager } from "@/app/libs/apiManager";

export const useApplicationApprove = () => {
  return useApiManager({
    method: "POST",
    path: "application/approve",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("자금 조달 승인 성공:", data);
      },
      onError: (error: any) => {
        console.error("자금 조달 승인 실패:", error);
      },
    },
  }).setUseMutation;
};
