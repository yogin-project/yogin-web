import { useCheckMail } from "../apis/useCheckMail";

export const useCheckMailHandler = (
  setIsEmailChecked: (value: boolean) => void
) => {
  const { mutate: checkMail } = useCheckMail();

  const handleCheckEmail = (email: string) => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    checkMail(
      { body: { email } },
      {
        onSuccess: () => {
          alert("사용 가능한 이메일입니다.");
          setIsEmailChecked(true);
        },
        onError: (error) => {
          console.error("이메일 중복 확인 실패:", error);
          alert("이미 사용 중인 이메일입니다.");
          setIsEmailChecked(false);
        },
      }
    );
  };

  return { handleCheckEmail };
};
