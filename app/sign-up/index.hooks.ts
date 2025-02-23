import { useRouter } from "next/navigation";

export const useRouteSignUp = () => {
  const router = useRouter();

  return () => {
    router.push("/sign-up/corporate");
  };
};
