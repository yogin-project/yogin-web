import { Suspense } from "react";
import ManagementDetailClient from "./ManagementDetailClient";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ManagementDetailClient />
    </Suspense>
  );
}
