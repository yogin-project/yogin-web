import { useApiManager } from "../../libs/apiManager";

export const useAdminList = () => {
  return useApiManager({
    method: "GET",
    path: "admin/user/list",
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("유저 정보 리스트 조회 성공:", data);
      },
      onError: (error: any) => {
        console.error("유저 정보 리스트 조회 실패:", error);
      },
    },
  }).getUseQuery;
};
