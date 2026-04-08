/* eslint-disable react-hooks/immutability */
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DatatableWrapper from "@/components/Application/Admin/DatatableWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DT_CATEGORY_COLUMN } from "@/lib/column";
import { coloumnConfig } from "@/lib/helperFunction";
import {
  ADMIN_CATEGORY_ADD,
  ADMIN_CATEGORY_SHOW,
  ADMIN_DASHBOARD,
  ADMIN_TRASH,
} from "@/routes/AdminPanelRoute";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import { FiPlus } from "react-icons/fi";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_CATEGORY_SHOW, label: "Category" },
];

const ShowCategory = () => {

  const columns = useMemo(() => {
    return coloumnConfig(DT_CATEGORY_COLUMN)
  }, [])

   const action = useCallback((row,deleteType,handleDelete) =>{
        let actionMenu = []
        action.push()
        return actionMenu;
   },[])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]">
          <div className="flex justify-between">
            <h4 className="text-xl font-semibold">Show Category</h4>
            <Button>
              <FiPlus />
              <Link href={ADMIN_CATEGORY_ADD}>New Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-5">
          <DatatableWrapper
           queryKey="category-data"
           fetchUrl='/api/category'
           initialPageSize={10}
           columnConfig={columns}
           exportEndpoint='/api/category/export'
           deleteEndpoint='/api/category/delete'
           deleteType='SD'
           trashView={`${ADMIN_TRASH}?typeof=category`}
           createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowCategory;
