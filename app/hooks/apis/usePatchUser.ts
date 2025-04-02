import { useApiManager } from "../../libs/apiManager";

export const usePatchUser = () => {
  return useApiManager({
    method: "PATCH",
    path: "user",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("유저 정보 수정 성공:", data);
      },
      onError: (error: any) => {
        console.error("유저 정보 수정 실패:", error);
      },
    },
  }).setUseMutation;
};
