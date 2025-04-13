import { useApiManager } from "@/app/libs/apiManager";

export const useResetPasswordMutation = () => {
  return useApiManager({
    method: "PATCH",
    path: "auth/password/reset",

    mutationOption: {
      onSuccess: (data: any) => {
        console.log("비밀번호 초기화 완료:", data);
      },
      onError: (error: any) => {
        console.log("비밀번호 초기화 실패:", error);
      },
    },
  }).setUseMutation;
};
