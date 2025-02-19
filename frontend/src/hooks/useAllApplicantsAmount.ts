import { fetchAll } from "@/util/rishu";
import { lecture, array2LectureArray } from "@/util/timeTable";
import { useEffect, useState } from "react";

const useAllApplicantsAmount = (lectures: lecture[]) => {
  const [applicantsAmount, setApplicantsAmount] = useState<lecture[]>(lectures);

  useEffect(() => {
    fetchAll().then((data) => {
      setApplicantsAmount(array2LectureArray(data));
    });
  }, []);

  return applicantsAmount;
};

export default useAllApplicantsAmount;
