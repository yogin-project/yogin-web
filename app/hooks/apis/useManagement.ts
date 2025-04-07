import { useApiManager } from "@/app/libs/apiManager"

export const useManagement = () => {
    return useApiManager({
        method: "POST",
        path: "management",

        mutationOption: {
            onSuccess: (data: any) => {
                console.log("매니징 신청 성공:", data);
            },
            onError: (error: any) => {
                console.error("매니징 신청 실패:", error);
            }
        }
    }).setUseMutation;
}