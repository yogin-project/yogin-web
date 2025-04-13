import { Suspense } from "react";
import RendDetailClient from "./RendDetailClient";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <RendDetailClient />
    </Suspense>
  );
}
