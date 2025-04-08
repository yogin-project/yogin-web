"use client";

import React, { useState } from "react";
import { useApllicationList } from "../hooks/apis/useApplicationList";

function REND() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [state, setState] = useState("PENDING");
  const [sort, setSort] = useState("DESC");
  const [location, setLocation] = useState("전체");

  const queryParams: Record<string, any> = {
    page: page + 1,
    limit: rowsPerPage,
    sort,
    orderBy: "createdAt",
  };

  const { data } = useApllicationList(queryParams);

  console.log("data: ", data);

  return <div>REND</div>;
}

export default REND;
