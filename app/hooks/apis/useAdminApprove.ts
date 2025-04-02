import { useApiManager } from "@/app/libs/apiManager";

export const useAdminApprove = () => {
  return useApiManager({
    method: "POST",
    path: "admin/expert-info/approve",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("가입 승인 완료:", data);
      },
      onError: (error: any) => {
        console.error("가입 승인 실패:", error);
      },
    },
  }).setUseMutation;
};
