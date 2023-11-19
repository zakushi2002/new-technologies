import { Button, Form, Input, Modal, Table } from "antd";
import { useState } from "react";
import useMutateAdmin from "../../hooks/useMutate/useMutateAdmin";

const ManageThesis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createMajor } = useMutateAdmin();
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    createMajor(values).then(() => {
      setIsModalOpen(false);
    });
    // form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {};
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => <Button type="default">Edit</Button>,
    },
  ];
  const data = [
    {
      key: "1",
      id: "1",
      name: "Information Technology",
    },
    {
      key: "2",
      id: "2",
      name: "Information Security",
    },
    {
      key: "3",
      id: "3",
      name: "Computer Science",
    },
  ];
  return (
    <div className=" flex flex-col gap-3">
      <div className=" flex flex-row justify-between">
        <div className="">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="inline"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Name" name="majorName">
              <Input placeholder="majorName" />
            </Form.Item>
            <Form.Item>
              <Button type="default" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="">
          <Button type="default" onClick={() => showModal()}>
            Add major
          </Button>
        </div>
      </div>
      <div className="">
        <Table columns={columns} dataSource={data}></Table>
        <Modal
          title="Create Major"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[null, null]}
        >
          <Form
            name="Create Major"
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Id"
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please input major Id!",
                },
                {
                  pattern: /^[0-9]*$/, // Regular expression to allow only numeric input
                  message: "Please enter a valid id!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Thesis name"
              name="majorName"
              rules={[
                {
                  required: true,
                  message: "Please input major name!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex flex-row justify-end">
              <Form.Item
              //   wrapperCol={{
              //     offset: 8,
              //     span: 16,
              //   }}
              >
                <Button type="default" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ManageThesis;
