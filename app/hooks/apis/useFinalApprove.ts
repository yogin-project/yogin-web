import { useApiManager } from "@/app/libs/apiManager";

export const useFinalApprove = () => {
  return useApiManager({
    method: "POST",
    path: "application/additional-info/require",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("추가 자료 요청 성공:", data);
      },
      onError: (error: any) => {
        console.error("추가 자료 요청 실패:", error);
      },
    },
  }).setUseMutation;
};
