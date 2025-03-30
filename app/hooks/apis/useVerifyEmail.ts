import { useApiManager } from "@/app/libs/apiManager"

export const useVerifyEmailMutation = () => {
    return useApiManager({
        method: "POST",
        path: "auth/verify-email",

        mutationOption: {
            onSuccess: (data: any) => {
                console.log("이메일 인증번호 요청 성공:", data);
            },
            onError: (error: any) => {
                console.error("이메일 인증번호 요청 실패:", error);
            }
        }
    }).setUseMutation;
}