import { useApiManager } from "@/app/libs/apiManager";

export const useFirstApplicationId = (type: "FUND" | "RND") => {
  const queryParams: Record<string, any> = {
    page: 1,
    limit: 10,
    state: "TEMP", // 고정
    type,
  };

  const queryString = new URLSearchParams(
    Object.entries(queryParams).map(([key, val]) => [key, String(val)])
  ).toString();

  return useApiManager({
    method: "GET",
    path: `company/application/list?${queryString}`,
    queryOption: {
      enabled: !!type,
      select: (res: any) => {
        const first = res?.data?.applications?.[0];
        return first?.id ?? null;
      },
    },
    mutationOption: {
      onSuccess: (data) => {
        console.log("✅ TEMP 상태 신청 목록 조회 성공:", data);
      },
      onError: (err) => {
        console.error("❌ 신청 목록 조회 실패:", err);
      },
    },
  }).getUseQuery;
};
