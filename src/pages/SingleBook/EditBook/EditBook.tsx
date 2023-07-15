/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import { useAppSelector } from "../../../redux/hook";
import {
  useGetSingleBookQuery,
  useUpdateBooksMutation,
} from "../../../redux/features/books/bookApi";
import { useNavigate, useParams } from "react-router-dom";

interface IForm {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  email: string | null;
  reviews: string[];
}

const EditBook = () => {
  const { user } = useAppSelector((state) => state.user);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: singleBook } = useGetSingleBookQuery(id as string);
  const [updateBook, { isLoading, isSuccess }] = useUpdateBooksMutation();

  const [title, setTitle] = useState(singleBook?.data?.title);
  const [author, setAuthor] = useState(singleBook?.data?.author);
  const [genre, setGenre] = useState(singleBook?.data?.genre);
  const [publicationDate, setPublicationDate] = useState(
    singleBook?.data?.publication_date
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess && !isLoading) {
    toast.success("Book Update successfully");
    navigate(`/book/${id as string}`);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const submitData: IForm = {
      title: title,
      author: author,
      genre: genre,
      publication_date: publicationDate,
      email: user.email,
      reviews: singleBook?.data?.reviews,
    };

    updateBook({ data: submitData, id }).catch((e: any) => console.log(e));

    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationDate("");
  };

  return (
    <div className="my-20 w-11/12 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl mb-4">Update Book</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            defaultValue={singleBook?.data?.title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            defaultValue={singleBook?.data?.author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border-gray-300 border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block mb-2">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            defaultValue={singleBook?.data?.genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border-gray-300 border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publication_date" className="block mb-2">
            Publication Date
          </label>
          <input
            type="text"
            id="genre"
            defaultValue={singleBook?.data?.publication_date}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full border-gray-300 border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBook;
