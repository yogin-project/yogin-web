import { useApiManager } from "../../libs/apiManager";

export const useApproveFinal = () => {
  return useApiManager({
    method: "POST",
    path: "application/approve/final",

    mutationOption: {
      onSuccess: (data: any) => {
        console.log("최종 승인 확인 성공:", data);
      },
      onError: (error: any) => {
        console.error("최종 승인 확인 실패:", error);
      },
    },
  }).setUseMutation;
};
