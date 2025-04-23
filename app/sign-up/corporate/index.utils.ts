import { ChangeEvent } from "react";
import { Dayjs } from "dayjs";
import { useCheckBusinessNo } from "@/app/hooks/apis/useCheckBusinessNo";

export const initialFormData = {
  type: "CORPORATE",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  corpName: "",
  ceoName: "",
  businessNo: "",
  location: "서울",
  address: "",
  isAllowedST: "1",
  isAllowedPT: "1",
};

export const initialAgreements = {
  personalInfo: false,
  terms: false,
};

export const handleInputChangeFactory = (
  setFormData: any,
  setPasswordError: (v: boolean) => void,
  setIsEmailChecked: (v: boolean) => void
) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError(false);
    }

    if (name === "email") {
      setIsEmailChecked(false);
    }
  };
};

export const handleAgreementChangeFactory = (setAgreements: any) => {
  return (updatedAgreements: any) => {
    setAgreements(updatedAgreements);
  };
};

export const isSignupEnabled = ({
  agreements,
  formData,
  isEmailChecked,
}: {
  agreements: { personalInfo: boolean; terms: boolean };
  formData: any;
  isEmailChecked: boolean;
}) => {
  return (
    agreements.personalInfo &&
    agreements.terms &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.phoneNumber &&
    formData.corpName &&
    formData.ceoName &&
    formData.businessNo &&
    formData.location &&
    formData.address &&
    isEmailChecked
  );
};

export const useCheckBusinessNoHandler = (
  setIsBusinessNoChecked: (value: boolean) => void
) => {
  const { mutate: checkBusinessNo } = useCheckBusinessNo();

  const handleCheckBusinessNo = (
    businessNo: string,
    ceoName: string,
    startDate: null | Dayjs
  ) => {
    let numberOnly = businessNo;
    if (businessNo.includes("-")) {
      numberOnly = businessNo.replace("-", "");
    }
    const businessNoRegex = /^\d{10}$/;
    if (!businessNoRegex.test(businessNo)) {
      alert("사업자번호는 '-' 제외 숫자 10자리로 입력해주세요.");
      return;
    }

    if (!startDate) {
      alert("개업일자를 선택해주세요.");
      return;
    }

    const formattedStartDate = startDate.format("YYYYMMDD");

    checkBusinessNo(
      {
        body: {
          businesses: [
            {
              b_no: numberOnly,
              start_dt: formattedStartDate,
              p_nm: ceoName,
              p_nm2: "",
              b_nm: "",
              corp_no: "",
              b_sector: "",
              b_type: "",
              b_adr: "",
            },
          ],
        },
      },
      {
        onSuccess: () => {
          alert("검증된 사업자번호입니다.");
          setIsBusinessNoChecked(true);
          return true;
        },
        onError: () => {
          alert("검증되지 않은 사업자번호입니다.");
          setIsBusinessNoChecked(false);
          return false;
        },
      }
    );
  };

  return { handleCheckBusinessNo };
};
