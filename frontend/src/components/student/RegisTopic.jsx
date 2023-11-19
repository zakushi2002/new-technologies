import { Drawer, Space, Table, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
const RegisTopic = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = "green";
            if (tag === "unavailable") {
              color = "red";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            className=" cursor-pointer hover:text-blue-400"
            onClick={showDrawer}
          />
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      <div className=""></div>
      <div className="">
        <Table columns={columns} dataSource={data}></Table>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
          width={1950}
        >
          <p>Some contents...</p>
        </Drawer>
      </div>
    </div>
  );
};

export default RegisTopic;
