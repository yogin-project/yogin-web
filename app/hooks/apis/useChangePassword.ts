import { useApiManager } from "@/app/libs/apiManager"

export const useChangePassword = () => {
    return useApiManager({
        method: 'POST',
        path: 'auth/password/change',
        mutationOption: {
            onSuccess: (data: any) => {
                console.log("비밀번호 변경 성공:", data);
            },
            onError: (error: any) => {
                console.log("비밀번호 변경 실패:", error);
            },
        },
    }).setUseMutation;
}