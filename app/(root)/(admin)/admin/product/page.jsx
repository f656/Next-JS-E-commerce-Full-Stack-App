"use client";
/* eslint-disable react-hooks/immutability */
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DatatableWrapper from "@/components/Application/Admin/DatatableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import EditAction from "@/components/Application/Admin/EditAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {  DT_Product_COLUMN } from "@/lib/column";
import { columnConfig } from "@/lib/columnConfig";
import {
  ADMIN_DASHBOARD,
  ADMIN_PRODUCT_ADD,
  ADMIN_PRODUCT_EDIT,
  ADMIN_PRODUCT_SHOW,
  ADMIN_TRASH,
} from "@/routes/AdminPanelRoute";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import { FiPlus } from "react-icons/fi";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_SHOW, label: "Product" },
];

const ShowProduct = () => {
  const columns = useMemo(() => {
    return columnConfig(DT_Product_COLUMN);
  }, []);

  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <EditAction key="edit" href={ADMIN_PRODUCT_EDIT(row.original._id)} />,
    );
    actionMenu.push(
      <DeleteAction
        key="delete"
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      />,
    );
    return actionMenu;
  }, []);

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm gap-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]">
          <div className="flex justify-between">
            <h4 className="text-xl font-semibold">Show Product </h4>
            <Button>
              <FiPlus />
              <Link href={ADMIN_PRODUCT_ADD}>New Product</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <DatatableWrapper
            queryKey="product-data"
            fetchUrl="/api/product"
            initialPageSize={10}
            columnConfig={columns}
            exportEndpoint="/api/product/export"
            deleteEndpoint="/api/product/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?typeof=product`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowProduct;
