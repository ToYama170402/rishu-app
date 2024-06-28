// risyuAPIから返ってきたデータを構造化するクラスを定義

// 講義の詳細情報と志望者数を保持
class lecture {
  constructor(
    lectureNumber,// 時間割番号
    category,// 科目区分
    name,// 時間割名
    dateTime,// 曜日時限
    teacher,// 教員名
    target,// 対象学生
    capacity,// 適正人数
    applicantsAmount,// 全登録数
    priority,// 優先指定
    first,// 第１希望
    second,// 第２希望
    third,// 第３希望
    forth,// 第４希望
    fifth// 第５希望
  ) {
    this.lectureNumber = lectureNumber
    this.category = category
    this.name = name
    this.dateTime = dateTime
    this.teacher = teacher
    this.target = target
    this.capacity = parseInt(capacity)
    this.applicantsAmount = parseInt(applicantsAmount)
    this.priority = parseInt(priority)
    this.first = parseInt(first)
    this.second = parseInt(second)
    this.third = parseInt(third)
    this.forth = parseInt(forth)
    this.fifth = parseInt(fifth)
  }

  // risyu APIの基本モードで取得できる情報をセット
  setNormalMode(
    lectureNumber,
    capacity,
    applicantsAmount,
    priority,
    first,
    second,
    third,
    forth,
    fifth
  ) {
    this.lectureNumber = lectureNumber;
    this.capacity = capacity;
    this.applicantsAmount = applicantsAmount;
    this.priority = priority;
    this.first = first;
    this.second = second;
    this.third = third;
    this.forth = forth;
    this.fifth = fifth;
  }

  // risyu APIの科目詳細モードで取得できる情報をセット
  setDetailMode(
    lectureNumber,
    category,
    name,
    dateTime,
    teacher,
    target
  ) {
    this.lectureNumber = lectureNumber;
    this.category = category;
    this.name = name;
    this.dateTime = dateTime;
    this.teacher = teacher;
    this.target = target;
  }

  // 各志望の応募者を配列で返す
  getApplicantsAmount() {
    return [
      this.priority,
      this.first,
      this.second,
      this.third,
      this.forth,
      this.fifth
    ]
  }

  // 各志望の応募者の適正人数に対する割合を返す
  getApplicantsRate() {
    const applicants = [
      this.priority,
      this.first,
      this.second,
      this.third,
      this.forth,
      this.fifth
    ]
    return applicants.map(i => { return i / this.capacity * 100 })
  }
}

// ある1️日の全講義を各時限で配列として保持
class dayTimeTable {
  first = []// 1限目
  second = []// 2限目
  third = []// 3限目
  forth = []// 4限目
  fifth = []// 5限目
  addLecture(lecture) {
    switch (lecture.dateTime[1]) {
      case "1":
        this.first.push(lecture);
        break;
      case "2":
        this.second.push(lecture);
        break;
      case "3":
        this.third.push(lecture);
        break;
      case "4":
        this.forth.push(lecture);
        break;
      case "5":
        this.fifth.push(lecture);
        break;
    }
  }
}

// 1週間の全講義情報を曜日ごとに保持
class weekTimeTable {
  Mon = new dayTimeTable();// 月曜日
  Tue = new dayTimeTable();// 火曜日
  Wed = new dayTimeTable();// 水曜日
  Thu = new dayTimeTable();// 木曜日
  Fri = new dayTimeTable();// 金曜日
  rishuApp = document.getElementById("rishu-app");

  // 全講義情報を1次元配列として引数に与えるとセットする
  setAllFromArr(lectures) {
    for (const lec of lectures) {
      try {
        switch (lec.dateTime[0]) {
          case "月":
            this.Mon.addLecture(lec);
            break;
          case "火":
            this.Tue.addLecture(lec);
            break;
          case "水":
            this.Wed.addLecture(lec);
            break;
          case "木":
            this.Thu.addLecture(lec);
            break;
          case "金":
            this.Fri.addLecture(lec);
            break;
        }
      } catch (err) {
        console.log(lec)
      }
    }
  }

  // 表示する
  render() {
    const dates = [this.Mon, this.Tue, this.Wed, this.Thu, this.Fri]
    for (const date of dates) {
      const day = [date.first, date.second, date.third, date.forth, date.fifth];
      for (const times of day) {
        for (const time of times) {
          const applicantsRates = time.getApplicantsRate();
          let barWrap = document.createElement("div");
          barWrap.classList = "lecture__bar-wrap";
          for (const applicantsRate of applicantsRates) {
            let bar = document.createElement("div");
            bar.style.width = `${applicantsRate}%`
            bar.classList = "lecture__bar"
            barWrap.insertAdjacentElement("beforeend", bar)
          }
          let lectureNameEle = document.createElement("div");
          lectureNameEle.classList = "lecture__name";
          lectureNameEle.textContent = time.name;
          let lectureEle = document.createElement("div");
          lectureEle.classList = "lecture"
          lectureEle.insertAdjacentElement("beforeend", lectureNameEle);
          lectureEle.insertAdjacentElement("beforeend", barWrap);
          let lecturesEle = document.getElementById(time.dateTime);
          try {
            lecturesEle.insertAdjacentElement("beforeend", lectureEle);
          } catch (err) {
            console.log(time)
          }
        }
      }
    }
  }
}