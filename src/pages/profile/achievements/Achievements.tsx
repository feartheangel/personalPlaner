import React from "react";
import { useSelector } from "react-redux";

const Achievements = () => {
  const achievements = useSelector(
    (state: any) => state.taskAllDays.achievements,
  );

  const emptyHandler = () => {
    const data = achievements?.filter((elem: any) => elem.status);

    if (!data?.length) {
      return (
        <div className="w-full flex justify-center items-center mt-60">
          <p className="text-xl font-bold">Достижений нет...</p>
        </div>
      );
    }
  };

  return (
    <div className="w-full px-4 my-6 flex flex-col">
      <p className="font-bold md:text-2xl text-xl text-white mb-10 flex justify-center">
        ДОСТИЖЕНИЯ
      </p>
      <div className="md:flex h-auto">
        {achievements
          ?.filter((elem: any) => elem.status)
          .map((item: any) => (
            <div
              key={item.id}
              className="md:w-2/12 border-2 border-gray-400 px-3 py-3 flex flex-col justify-between items-center md:mr-10 mb-10"
            >
              <img src={item.src} alt={item.alt} title={item.description} />
              <p className="text-2xl mt-5 md:mt-0">{item.name}</p>
            </div>
          ))}
        {emptyHandler()}
      </div>
    </div>
  );
};

export default Achievements;
