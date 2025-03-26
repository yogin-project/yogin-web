import { useApiManager } from "@/app/libs/apiManager"

export const useCheckBusinessNo = () => {
    return useApiManager({
        method: 'POST',
        path: 'auth/check-business-no',
        mutationOption: {
            onSuccess: (data: any) => {
                console.log("사업자번호 검증 성공:", data);
            },
            onError: (error: any) => {
                console.error("사업자번호 검증 실패:", error);
            },
        },
    }).setUseMutation;
}