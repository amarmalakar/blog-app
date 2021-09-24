import { useState } from "react";

const Paganation = ({ postsPerPage, totalPosts, paginate }) => {
    const [active, setActive] = useState(1)
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }



    return (
        <div>
            <ul className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => {
                                paginate(number)
                                setActive(number)
                            }}
                            // className="z-10 bg-green-50 border-green-500 text-green-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            className={number === active ? 
                                "z-10 bg-green-500 border-green-500 text-white font-semibold relative inline-flex items-center px-4 py-2 border text-sm"
                            :
                                "z-10 bg-green-50 border-green-500 text-green-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            }
                        >
                            <span>{number}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Paganation
