import { useApiManager } from "../../libs/apiManager";

export const useCheckMail = () => {
  return useApiManager({
    method: "POST",
    path: "auth/check-mail",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("이메일 중복 체크 성공:", data);
      },
      onError: (error: any) => {
        console.error("이메일 중복 체크 실패:", error);
      },
    },
  }).setUseMutation;
};
