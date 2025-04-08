"use client";

export function handleCorporateSubmit(
  profileType: string | undefined,
  router: ReturnType<typeof import("next/navigation").useRouter>
) {
  if (profileType === "CORPORATE") {
    router.push("/submit-type");
  } else {
    alert("기업 회원만 이용할 수 있습니다.");
  }
}

export function handleRNDSearch(
  profileType: string | undefined,
  router: ReturnType<typeof import("next/navigation").useRouter>
) {
  if (profileType === "PROFESSOR") {
    router.push("/rnd");
  } else {
    alert("R&D (석/박사) 회원만 이용할 수 있습니다.");
  }
}

export function handleRendSearch(
  profileType: string | undefined,
  router: ReturnType<typeof import("next/navigation").useRouter>
) {
  if (profileType === "MANAGER") {
    router.push("/rend");
  } else {
    alert("은행(지점장) 회원만 이용할 수 있습니다.");
  }
}
