import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academitManagement";

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
  },
  {
    title: "Year",
    dataIndex: "year",
  },
  {
    title: "start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const AcademicSemestet: React.FC = () => {
  const { data, isFetching, isLoading } =
    useGetAllAcademicSemesterQuery(undefined);
  console.log(data);
  if (!data?.data) return null;

  const tableData = data.data.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <Table<DataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemestet;
