import { useRouter } from "next/navigation";
import { RouteInSignInPage } from "./index.types";

export const useRouteSignInPage = () => {
  const router = useRouter();

  return (type: RouteInSignInPage) => {
    router.push(`/${type}`);
  };
};
