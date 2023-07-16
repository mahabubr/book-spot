/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
  useUpdateReviewMutation,
} from "../../redux/features/books/bookApi";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { usePostWishlistMutation } from "../../redux/features/wishlist/wishlistSlice";

const SingleBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const { data: book, isLoading } = useGetSingleBookQuery(id as string);
  const [deleteBook, { isSuccess }] = useDeleteBookMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [postWishlist, { isSuccess: WishlistSuccess }] =
    usePostWishlistMutation();

  if (isSuccess) {
    toast.success("Book Deleted Successful");
    navigate("/");
    return;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (WishlistSuccess) {
    toast.success("Book Added Successful. go to wishlist");
    navigate("/wishlist");
    return;
  }

  const handleEdit = (id: string) => {
    if (user.email !== book?.data?.email) {
      return toast.error("Your are unauthorized");
    }

    navigate(`/book/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (user.email !== book?.data?.email) {
      return toast.error("Your are unauthorized");
    }

    const confirmation = window.confirm("Are you sure you want to delete?");

    if (confirmation) {
      deleteBook(id).catch((e: any) => console.log(e));
    }
  };

  const handleReview = () => {
    const submitData = {
      comment: title,
    };

    updateReview({ data: submitData, id }).catch((e) => console.log(e));

    window.location.reload();
  };

  const handleWishlist = () => {
    postWishlist({ ...book?.data, user_email: user?.email }).catch((e) =>
      console.log(e)
    );
  };

  return (
    <div className="my-20 w-11/12 mx-auto">
      <div className="md:flex justify-between items-center  gap-10">
        <div className="py-6 px-4 bg-slate-100 rounded-xl md:w-8/12">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handleWishlist} className="btn btn-success btn-sm">
              Add to wishlist
            </button>
            <button className="btn btn-neutral btn-sm">Bookmark</button>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            {book?.data?.title}
          </h3>
          <p className="text-gray-600 mb-2">Author: {book?.data?.author}</p>
          <p className="text-gray-600 mb-2">Genre: {book?.data?.genre}</p>
          <p className="text-gray-600">
            Publication Date: {book?.data?.publication_date}
          </p>

          <div className="flex items-center mt-8 gap-3">
            <button
              onClick={() => handleEdit(book?.data?._id as string)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book?.data?._id as string)}
              className="btn btn-secondary"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="md:w-6/12 mt-10 md:mt-0  h-64 border rounded-md p-5 shadow-xl relative overflow-y-scroll">
          {book?.data?.reviews?.map((text: string) => {
            return (
              <div className="flex items-center gap-3" key={text}>
                <div className="avatar">
                  <div className="w-8 mask mask-triangle">
                    <img
                      src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                      alt="avatar"
                    />
                  </div>
                </div>
                <p className="text-blue-500 font-medium">{text}</p>
              </div>
            );
          })}
          <div className="sticky mt-8 bottom-0 left-0 right-0 focus:outline-0 flex justify-center items-center">
            <input
              type="text"
              id="title"
              placeholder="Type your review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded focus:outline-0"
            />
            <button onClick={handleReview} className="btn btn-ghost">
              &#9166;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
