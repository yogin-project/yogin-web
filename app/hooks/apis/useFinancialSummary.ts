import { useApiManager } from "@/app/libs/apiManager";

// ✅ useFinancialSummary.ts
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

  return { get, post, put };
};
