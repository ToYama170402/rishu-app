import { fetchAll } from "@/util/rishu";
import { lecture, array2LectureArray } from "@/util/timeTable";
import { useEffect, useState } from "react";

const useAllApplicantsAmount = () => {
  const [applicantsAmount, setApplicantsAmount] = useState<lecture[]>([]);

  useEffect(() => {
    fetchAll().then((data) => {
      setApplicantsAmount(array2LectureArray(data));
    });
  }, []);

  return applicantsAmount;
};

export default useAllApplicantsAmount;
