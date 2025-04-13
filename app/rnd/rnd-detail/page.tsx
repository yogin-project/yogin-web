import { Suspense } from "react";
import RNDDetailClient from "./RndDetailClient";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <RNDDetailClient />
    </Suspense>
  );
}
