import { useApiManager } from '../../libs/apiManager';

export const useAdminFinancialSummaryMutation = (
  params: Record<string, any>
) => {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, val]) => [key, String(val)])
    )
  ).toString();

  return useApiManager({
    method: 'GET',
    path: `admin/financial-summary?${queryString}`,
    mutationOption: {
      onSuccess: (data: any) => {
        console.log('기업 회원 재무요약 조회 성공:', data);
      },
      onError: (error: any) => {
        console.error('기업 회원 재무요약 조회 실패:', error);
      },
    },
  }).getUseQuery;
};
