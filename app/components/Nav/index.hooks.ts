import { useRouter } from "next/navigation";
import { routerType } from "./index.types";

export const useRouteInHeader = () => {
  const router = useRouter();

  return (type: routerType) => {
    router.push(`/${type}`);
  };
};
