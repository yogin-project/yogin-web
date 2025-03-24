import { useApiManager } from "../../libs/apiManager";

export const useSignInCorpMutation = () => {
  return useApiManager({
    method: "POST",
    path: "auth/sign-in/corp",

    mutationOption: {
      onSuccess: (data: any) => {
        console.log("로그인 성공:", data);
      },
      onError: (error: any) => {
        console.error("로그인 실패:", error);
      },
    },
  }).setUseMutation;
};
