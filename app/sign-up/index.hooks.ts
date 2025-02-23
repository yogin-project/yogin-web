import { useRouter } from "next/navigation";
import { MemberType } from "../types/common";

export const useRouteSignUp = () => {
  const router = useRouter();

  return (type: MemberType) => {
    router.push(`/sign-up/${type}`);
  };
};
