import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Post name is required")
    .min(3, "Post name must be at least 3 characters")
    .max(20, "Post name cannot exceed 20 characters"),
  image: Yup.mixed().required("Please select a valid image"),
});
