import UseCallApi from "../hooks/useCallApi";
const { UseGet, UsePost } = UseCallApi();

export const getAllPostApi = () => {
  const url = "/";
  return UseGet({ url });
};
export const getPostbyIdApi = (id) => {
  const url = `/detail/${id}`;
  return UseGet({ url });
};
export const createPostApi = (params) => {
  const url = "/addpost";
  return UsePost({ url, params });
};
export const deletePostApi = (id) => {
  const url = `/delete/${id}`;
  return UsePost({ url });
};
export const editPostApi = (id, params) => {
  const url = `/editPost/${id}`;
  return UsePost({ url, params });
};
