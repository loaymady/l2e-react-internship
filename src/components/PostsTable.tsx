import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./ui/Button";
import { FormValues, Post } from "../interface";
import { FormikProps, useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { validationSchema } from "../validation";
import Modal from "./ui/Modal";

const PostsTable = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [postIdClicked, setPostIdClicked] = useState("");

  /** --------- CREATING --------- */
  const onOpenAddModal = () => {
    setIsOpenAddModal(true);
  };
  const onCloseAddModal = () => {
    setIsOpenAddModal(false);
    formikCreate.resetForm();
  };

  const formikCreate = useFormik<FormValues>({
    initialValues: {
      name: "",
      image: null,
    },
    onSubmit: (values) => {
      const newPost: Post = {
        id: uuidv4(),
        name: values.name,
        image: values.image,
      };
      setPosts([...posts, newPost]);
      onCloseAddModal();
      formikCreate.resetForm();
    },
    validationSchema: validationSchema,
  });

  const handleImageChange = (
    formik: FormikProps<FormValues>,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    formik.setFieldValue("image", file || null);
  };
  /**\\ --------- CREATING --------- \\*/

  /** --------- DELETING --------- */
  const onOpenConfirmModal = (id: string) => {
    setIsOpenConfirmModal(true);
    setPostIdClicked(id);
  };

  const handleSubmitDelete = (e: FormEvent) => {
    e.preventDefault();
    const index = posts.findIndex((post) => post.id === postIdClicked);
    if (index !== -1) {
      setPosts([...posts.slice(0, index), ...posts.slice(index + 1)]);
    }
    onCloseConfirmModal();
  };

  const onCloseConfirmModal = () => {
    setIsOpenConfirmModal(false);
    setPostIdClicked("");
  };
  /**\\ --------- DELETING --------- \\*/

  return (
    <>
      <div className="relative overflow-x-auto">
        <Button className="my-4 mx-auto" size={"sm"} onClick={onOpenAddModal}>
          Add A New Post
        </Button>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Post name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post.name}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={post.image ? URL.createObjectURL(post.image) : ""}
                    alt={post.name}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                </td>
                <td className="flex space-x-2 px-6 py-4">
                  <Button className=" px-4 py-2">Edit</Button>
                  <Button
                    variant={"danger"}
                    size={"sm"}
                    onClick={() => onOpenConfirmModal(post.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isOpenAddModal}
        closeModal={onCloseAddModal}
        title="Post A New Post"
      >
        <form className="space-y-3" onSubmit={formikCreate.handleSubmit}>
          <input
            type="text"
            name="name"
            className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
            placeholder="Post Name"
            onChange={formikCreate.handleChange}
            value={formikCreate.values.name}
          />
          {formikCreate.touched.name && formikCreate.errors.name ? (
            <p style={{ color: "red" }}>{formikCreate.errors.name}</p>
          ) : null}
          <input
            type="file"
            className="border-[1px] border-gray-300 shadow-lg  rounded-lg px-3 py-3 text-md w-full bg-transparent"
            name="image"
            accept="image/*"
            onChange={(e) => handleImageChange(formikCreate, e)}
          />
          {formikCreate.touched.image && formikCreate.errors.image ? (
            <p style={{ color: "red" }}>{formikCreate.errors.image}</p>
          ) : null}
          <div className="flex items-center space-x-2 mt-6">
            <Button className="bg-indigo-700 hover:bg-indigo-800 w-fit rounded-lg text-white px-3 py-3 duration-200 font-medium">
              Add
            </Button>
            <Button type="button" variant={"cancel"} onClick={onCloseAddModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={onCloseConfirmModal}
        title="Are you sure you want to remove this Post from your Store?"
        description="Deleting this Post will remove it permanently from your dataset. Please make sure this is the intended action."
      >
        <form className="space-y-3" onSubmit={handleSubmitDelete}>
          <div className="flex items-center space-x-2 mt-6">
            <Button variant={"danger"}>Yes, remove</Button>
            <Button
              type="button"
              variant={"cancel"}
              onClick={onCloseConfirmModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PostsTable;
