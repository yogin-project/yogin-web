// hooks/useSignUp.ts
import { useApiManager } from "../libs/apiManager";

interface SignUpParams {
  type: "MANAGER";
  email: string;
  password: string;
  phoneNumber: string;
  isAllowedST: number;
  isAllowedPT: number;
  name: string;
  branchName: string;
  region: string;
}

export const useSignUpMutation = () => {
  return useApiManager({
    method: "POST",
    path: "auth/sign-up",
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
