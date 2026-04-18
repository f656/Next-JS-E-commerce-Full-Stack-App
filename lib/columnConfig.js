export const columnConfig = (
  column,
  isCreatedAt = false,
  isUpdatedAt = false,
  isDeletedAt = false,
) => {
  const newColumn = [...column];

  if (isCreatedAt) {
    newColumn.push({
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ renderCellValue}) => (new Date(renderCellValue).toLocaleString())
    });
  }

  if (isUpdatedAt) {
    newColumn.push({
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ renderCellValue}) => (new Date(renderCellValue).toLocaleString())
    });
  }

  if (isDeletedAt) {
    newColumn.push({
      accessorKey: "deletedAt",
      header: "Deleted At",
      cell: ({ renderCellValue}) => (new Date(renderCellValue).toLocaleString())
    });
  }

  return newColumn;
};
