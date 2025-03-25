import { ChangeEvent } from "react";

export const initialFormData = {
  type: "CORPORATE",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  name: "",
  corpName: "",
  businessNo: "",
  location: "",
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
    formData.name &&
    formData.corpName &&
    formData.businessNo &&
    formData.location &&
    formData.address &&
    isEmailChecked
  );
};
