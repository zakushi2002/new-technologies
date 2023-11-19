import UseCallApi from "../hooks/useCallApi";

const { UsePost } = UseCallApi();
export const createMajorApi = (params) => {
  const url = "/v1/major/create";
  return UsePost({ url, params });
};
