import UseCallApi from "../hooks/useCallApi";
const { UsePost } = UseCallApi();

export const createCommentApi = (id, params) => {
  const url = `/addcomment/${id}`;
  return UsePost({ url, params });
};
