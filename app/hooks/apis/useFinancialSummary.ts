// hooks/apis/useFinancialSummary.ts

import { useApiManager } from "@/app/libs/apiManager";

export const useFinancialSummary = () => {
  const get = useApiManager({
    method: "GET",
    path: "company/financial-summary",
    queryKey: "financial-summary",
  }).getUseQuery;

  const post = useApiManager({
    method: "POST",
    path: "company/financial-summary",
  }).setUseMutation;

  const put = useApiManager({
    method: "PUT",
    path: "company/financial-summary",
  }).setUseMutation;

  return {
    get, // 사용: const { data } = useFinancialSummary().get;
    post, // 사용: useFinancialSummary().post.mutate({ body: ... })
    put, // 사용: useFinancialSummary().put.mutate({ body: ... })
  };
};
