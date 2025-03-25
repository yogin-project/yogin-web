// hooks/apis/useProfile.ts
import { useApiManager } from "../../libs/apiManager";

export const useProfileMutation = (enabled: boolean) => {
  return useApiManager({
    method: "GET",
    path: "user/profile",
    queryOption: {
      enabled,
    },
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("프로필 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("프로필 조회 실패:", error);
      },
    },
  }).getUseQuery;
};
