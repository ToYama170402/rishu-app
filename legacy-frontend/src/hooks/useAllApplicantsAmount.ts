import { fetchAll } from "@/util/rishu";
import { array2LectureArray } from "@/util/timeTable";
import { lectureWithApplicantsAmount } from "@/types/lecture";
import { useEffect, useState } from "react";

const useAllApplicantsAmount = (lectures: lectureWithApplicantsAmount[]) => {
  const [applicantsAmount, setApplicantsAmount] =
    useState<lectureWithApplicantsAmount[]>(lectures);

  useEffect(() => {
    const fetch = () => {
      fetchAll().then((data) => {
        setApplicantsAmount(array2LectureArray(data));
      });
      setTimeout(fetch, 50000);
    };
    fetch();
  }, []);

  return applicantsAmount;
};

export default useAllApplicantsAmount;
