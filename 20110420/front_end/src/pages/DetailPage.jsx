import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPostbyIdApi } from "../api/post";
import { useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createCommentApi } from "../api/comment";

const DetailPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState({});
  const {
    data: detailPost,
    refetch: getPostbyId,
    isLoading: loading,
  } = useQuery({
    queryKey: ["DetailPost"],
    queryFn: () => getPostbyIdApi(param.id),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const { mutate: handleCreateComment } = useMutation({
    mutationFn: () => createCommentApi(param.id, content),
    onSuccess: () => {
      message.success("Create comment success");
      getPostbyId();
    },
  });
  const handleSubmit = (values) => {
    setContent(values);
    handleCreateComment(values);
  };
  useEffect(() => {
    getPostbyId();
  }, []);
  return (
    <div className=" ml-[100px] mr-[100px] pl-[100px] pr-[100px]">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-200">
          <div className="bg-white p-4 rounded shadow mb-4">
            <p className="text-xl font-bold">Author: {detailPost?.author}</p>
            <p className="text-lg">{detailPost?.content}</p>
          </div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
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
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="comment"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please input content!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="default" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
          <div className="bg-white p-4 rounded shadow mt-4">
            <h3 className="text-xl font-bold">
              Comments: {detailPost.listcomment.length}
            </h3>
            {detailPost.listcomment &&
              detailPost.listcomment.map((comment) => {
                return (
                  <div
                    key={comment?.id}
                    className="bg-gray-100 p-2 rounded shadow mb-2"
                  >
                    <p>{comment?.content}</p>
                  </div>
                );
              })}
          </div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 inline-block"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
