/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeEvent, useState } from "react";
import {
  useGetAllBookQuery,
  useGetBooksQuery,
} from "../../redux/features/books/bookApi";
import { IBooks } from "../../types";
import { Link } from "react-router-dom";

interface GetBooksQueryParams {
  searchTerm?: string;
  date?: string | number;
  genre?: string;
}

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(0);
  const [genre, setGenre] = useState("");

  const queryData: GetBooksQueryParams = {
    genre,
    searchTerm,
    date,
  };

  const { data } = useGetBooksQuery(queryData);
  const { data: AllBooks } = useGetAllBookQuery("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = parseInt(event.target.value);
    setDate(selectedValue);
    console.log(selectedValue);
  };

  const genreData: string[] = Array.from(
    new Set<string>(AllBooks?.data?.map((g: { genre: string }) => g.genre))
  );

  const handleGenreSelection = (genre: string) => {
    setGenre(genre);
  };
  return (
    <div className="my-20 w-11/12 mx-auto">
      <div className="w-full mb-10 gap-5">
        <div className="flex items-center">
          <input
            type="text"
            className="px-4 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Filter by genre
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {genreData.map((data: string) => (
                <li key={data}>
                  <a onClick={() => handleGenreSelection(data)}>{data}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:w-6/12 place-items-center mt-5">
          <div>
            <input
              type="range"
              min={1900}
              max={2025}
              className="range range-primary"
              onChange={handleDate}
            />
            <p>{date}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.data?.map((book: IBooks) => (
          <Link to={`/book/${book._id as string}`} key={book._id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="h-48 bg-gray-800 flex justify-center items-center">
                <svg
                  className="w-16 h-16 text-white animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <div className="py-6 px-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
                <p className="text-gray-600">
                  Publication Date: {book.publication_date}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
