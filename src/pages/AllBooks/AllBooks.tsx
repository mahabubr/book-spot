import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import { IBooks } from "../../types";

const AllBooks = () => {

    const {data}= useGetBooksQuery(undefined)


    return (
        <div className="my-20 w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
         data?.data?.map((book: IBooks) =>  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
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
             <h3 className="text-xl font-bold mb-2 text-gray-900">{book.title}</h3>
             <p className="text-gray-600 mb-2">Author: {book.author}</p>
             <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
             <p className="text-gray-600">Publication Date: {book.publication_date}</p>
         </div>
      </div>)
        }
     </div>
    );
};

export default AllBooks;