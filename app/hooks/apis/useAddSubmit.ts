import { useApiManager } from "@/app/libs/apiManager";

export const useAddSubmit = () => {
  return useApiManager({
    method: "POST",
    path: "company/application/additional-info/submitted",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("추가 자료 발송 완료:", data);
      },
      onError: (error: any) => {
        console.error("추가 자료 발송 실패:", error);
      },
    },
  }).setUseMutation;
};
