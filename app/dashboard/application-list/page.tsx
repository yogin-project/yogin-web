"use client";

import { useAdminApllicationList } from "@/app/hooks/apis/useAdminApplicationList";
import React, { useState } from "react";

function ApplicationList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState("FUND");
  const [sort, setSort] = useState("ASC");

  const queryParams: Record<string, any> = {
    type,
    page: page + 1,
    limit: rowsPerPage,
    sort,
    orderBy: "createdAt",
  };

  const { data, isLoading } = useAdminApllicationList(queryParams);

  return <div>application-list</div>;
}

export default ApplicationList;
