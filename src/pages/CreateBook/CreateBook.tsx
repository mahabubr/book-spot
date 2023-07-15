import { FormEvent, useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { usePostBooksMutation } from "../../redux/features/books/bookApi";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const CreateBook = () => {
  const { user } = useAppSelector((state) => state.user);

  const [postBook, { isLoading, isSuccess }] = usePostBooksMutation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess && !isLoading) {
    toast.success("Book Created successfully");
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const submitData = {
      title: title,
      author: author,
      genre: genre,
      publication_date: publicationDate,
      email: user.email,
      reviews: [],
    };

    postBook(submitData).catch((e) => console.log(e));

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
        <h2 className="text-2xl mb-4">Add Book</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
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
            value={author}
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
            value={genre}
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
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full border-gray-300 border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
