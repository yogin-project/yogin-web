import { useApiManager } from "@/app/libs/apiManager";

export const usePostPush = () => {
  return useApiManager({
    method: "POST",
    path: "push/all",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("메시지 전송 완료:", data);
      },
      onError: (error: any) => {
        console.error("메시지 전송 실패:", error);
      },
    },
  }).setUseMutation;
};
