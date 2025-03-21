import { useApiManager } from "../../libs/apiManager";

export const useProfileMutation = () => {
  return useApiManager({
    method: "GET",
    path: "user/profile",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("프로필 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("프로필 조회 성공:", error);
      },
    },
  }).getUseQuery;
};
