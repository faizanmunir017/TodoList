import * as yup from "yup";

export const schema = yup
  .object({
    taskName: yup
      .string()
      .required("Task name is required")
      .min(3, "Task must be at least 3 characters"),
  })
  .required();
