/* eslint-disable react-refresh/only-export-components */
import Button from "./ui/Button";
import { IPost } from "../interface";
import { memo } from "react";

interface IProps {
  post: IPost;
  index: number;
  onOpenEditModal: () => void;
  onOpenConfirmModal: () => void;
  setPostToEdit(post: IPost): void;
  setPostIdClicked(id: string): void;
}

const Post = ({
  post,
  index,
  onOpenEditModal,
  onOpenConfirmModal,
  setPostToEdit,
  setPostIdClicked,
}: IProps) => {
  function onEdit() {
    setPostToEdit(post);
    onOpenEditModal();
  }
  function onRemove() {
    setPostIdClicked(post.id);
    onOpenConfirmModal();
  }

  return (
    <tr
      key={index}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {post.name}
      </td>
      <td className="px-6 py-4">
        <img
          src={post.image ? URL.createObjectURL(post.image) : ""}
          alt={post.name}
          className="rounded-full h-10 w-10 object-cover"
        />
      </td>
      <td className="flex space-x-2 px-6 py-4">
        <Button className=" px-4 py-2" onClick={onEdit}>
          Edit
        </Button>
        <Button variant={"danger"} size={"sm"} onClick={onRemove}>
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default memo(Post);
