/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "./Datatable";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/lib/materialTheme";

const DatatableWrapper = ({
  queryKey,
  fetchUrl,
  columnConfig,
  initialPageSize = 10,
  exportEndpoint,
  deleteEndpoint,
  deleteType,
  trashView,
  createAction,
}) => {

  const { resolvedTheme} = useTheme();
  const [mounted,setMounted] = useState(false);

  useEffect(() => {
     setMounted(true);
  },[])

  if(!mounted) return null;
  return (
    <ThemeProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
      <Datatable
        queryKey={queryKey}
        fetchUrl={fetchUrl}
        columnConfig={columnConfig}
        initialPageSize={initialPageSize}
        exportEndpoint={exportEndpoint}
        deleteEndpoint={deleteEndpoint}
        deleteType={deleteType}
        trashView={trashView}
        createAction={createAction}
      />
    </ThemeProvider>
  );
};

export default DatatableWrapper;
