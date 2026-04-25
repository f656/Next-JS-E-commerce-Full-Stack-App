/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";
/* eslint-disable react-hooks/immutability */
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DatatableWrapper from "@/components/Application/Admin/DatatableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DT_CATEGORY_COLUMN } from "@/lib/column";
import { columnConfig } from "@/lib/columnConfig";
import {
  ADMIN_DASHBOARD,
  ADMIN_TRASH,
} from "@/routes/AdminPanelRoute";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_TRASH, label: "Trash" },
];

const TRASH_CONFIG = {
  category: {
    title:'Category Trash',
    columns:DT_CATEGORY_COLUMN,
    fetchUrl:'/api/category',
    exportUrl:'/api/category/export',
    deleteUrl:'/api/category/delete'
  }
}

const Trash = () => {

  const searchParams = useSearchParams()
  const trashOf = searchParams.get('trashof')|| "category";

  const config = TRASH_CONFIG[trashOf] 



 const columns = useMemo(() => {
  if (!config) return [];
  return columnConfig(config.columns, false, false, true);
}, [config]);

  const action = useCallback((row, deleteType, handleDelete) => {
   
     return  [<DeleteAction
        key="delete"
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      />]
  
  }, []);

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm gap-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]">
          <div className="flex justify-between">
            <h4 className="text-xl font-semibold">{config.title}</h4>
           
          </div>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <DatatableWrapper
            queryKey={`${trashOf} data-deleted`}
            fetchUrl={config.fetchUrl}
            initialPageSize={10}
            columnConfig={columns}
            exportEndpoint={config.exportUrl}
            deleteEndpoint={config.deleteUrl}
            deleteType="PD"
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Trash;
