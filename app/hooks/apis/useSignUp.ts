import { useApiManager } from "../../libs/apiManager";

interface SignUpCorporateParams {
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
  corpName: string;
  businessNo: string;
  location: string;
  address: string;
  file?: File; // 파일 업로드
}

export const useSignUpMutation = () => {
  return useApiManager({
    method: "POST",
    path: "auth/sign-up",
    body: (params: SignUpCorporateParams) => {
      const formData = new FormData();
      formData.append("type", "CORPORATE");
      formData.append("email", params.email);
      formData.append("password", params.password);
      formData.append("phoneNumber", params.phoneNumber);
      formData.append("isAllowedST", "1"); // 정해진 값
      formData.append("isAllowedPT", "1"); // 정해진 값
      formData.append("name", params.name);
      formData.append("corpName", params.corpName);
      formData.append("businessNo", params.businessNo);
      formData.append("location", params.location);
      formData.append("address", params.address);

      // 파일이 존재할 경우 추가
      if (params.file) {
        formData.append("file", params.file);
      }

      return formData;
    },
    headers: {
      "Content-Type": "multipart/form-data", // 파일 업로드를 위한 설정
    },
    mutationOption: {
      onSuccess: (data: any) => {
        console.log("회원가입 성공:", data);
      },
      onError: (error: any) => {
        console.error("회원가입 실패:", error);
      },
    },
  }).setUseMutation;
};
