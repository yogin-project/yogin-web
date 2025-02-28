import { useApiManager } from "../../libs/apiManager";

export const useSignInMutation = () => {
  return useApiManager({
    method: "POST",
    path: "auth/sign-in",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("회원가입 성공:", data);
      },
      onError: (error: any) => {
        console.error("회원가입 실패:", error);
      },
    },
  }).setUseMutation;
};
