import { useMutation } from "@tanstack/react-query";
import { createMajorApi } from "../../api/admin";
import { message } from "antd";

function useMutateAdmin() {
  const { mutateAsync: createMajor, isLoading: loadingCreateMajor } =
    useMutation({
      mutationFn: createMajorApi,
      onSuccess: (res) => {
        if (res.code === "ERROR_MAJOR_001") {
          message.error("Major's id already exists");
        } else {
          message.success("Create major successfully");
        }
      },
    });
  return {
    createMajor,
    loadingCreateMajor,
  };
}
export default useMutateAdmin;
