"use client";

export function handleCorporateSubmit(
  profileType: string | undefined,
  router: ReturnType<typeof import("next/navigation").useRouter>
) {
  if (profileType === "CORPORATE") {
    router.push("/submit");
  } else {
    alert("기업 회원만 이용할 수 있습니다.");
  }
}
