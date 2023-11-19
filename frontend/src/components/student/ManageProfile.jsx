import { Avatar, Button, Form, Input, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const ManageProfile = (props) => {
  const { bg } = props;
  const onFinish = (values) => {};
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: bg,
      }}
      className=" "
    >
      <div className=" border-b border-b-gray-500 mb-4 pb-2">
        {componentDisabled ? (
          <Button onClick={() => setComponentDisabled(false)}>Edit</Button>
        ) : (
          <div className=" flex gap-2">
            <Button onClick={() => setComponentDisabled(true)}> Accept</Button>
            <Button onClick={() => setComponentDisabled(true)} danger>
              {" "}
              Cancel
            </Button>
          </div>
        )}
      </div>
      <div className=" grid grid-flow-col grid-cols-[80%_20%]">
        <div className="  flex justify-center">
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            // style={{
            //   maxWidth: 600,
            // }}
            initialValues={{
              remember: true,
              fullName: "Tran Minh Gia Khanh",
              dob: "20/10/2000",
            }}
            disabled={componentDisabled}
            onFinish={onFinish}
            autoComplete="off"
            className="  bg-gray-300 w-[70%] flex justify-center flex-col p-10 rounded-xl"
          >
            <Form.Item
              label="Fullname"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
        <div className=" flex justify-center items-center">
          {/* <Avatar
            size={220}
            src={
              "https://i.pinimg.com/564x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg"
            }
          /> */}

          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader flex justify-center"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            size={220}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
