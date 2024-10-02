import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from "~/redux/slices/listsSlice";

const AllList = () => {
  const dispatch = useDispatch();
  const { lists } = useSelector((store) => store.lists);

  useEffect(() => {
    dispatch(getAllLists());
  }, []);

  console.log(lists);

  return (
    <div className="w-full  h-screen p-5 flex flex-grow gap-y-5 justify-start items-start  py-32   bg-blue-500">
      <div className="grid grid-cols-4 w-full gap-5">
        {lists.map((list) => (
          <div className="border flex justify-center items-center flex-col text-center">
            {list.creater} - {list.createdAt} - {list.listName}
            {list.movies.map((movie) => (
              <div>
                <span>{movie.title}</span>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                  className="w-44"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllList;
