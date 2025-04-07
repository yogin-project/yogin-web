import { useApiManager } from "@/app/libs/apiManager";

export const useDeleteUser = () => {
  return useApiManager({
    method: "DELETE",
    path: "auth",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("회원 탈퇴 성공:", data);
      },
      onError: (error: any) => {
        console.error("회원 탈퇴 실패:", error);
      },
    },
  }).setUseMutation;
};
