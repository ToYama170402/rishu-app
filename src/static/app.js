// rishu-appのメインスクリプト

// 設定メニュー
const settingMenu = document.getElementById("setting-menu");

// 設定ボタンをクリックしてメニューを表示
const settingOpenButton = document.getElementById("setting-open");
settingOpenButton.addEventListener("click", () => {
  settingMenu.classList.add("setting-menu-wrap--visible");
});

// メニューのバツボタンをクリックしてメニューを非表示
const settingCloseButton = document.getElementById("setting-close")
settingCloseButton.addEventListener("click", () => {
  settingMenu.classList.remove("setting-menu-wrap--visible");
});

// メイン関数
// awaitを使うためasync関数にする
async function main() {
  let datas = await fetchNormalMode();
  let lectures = [];
  datas.forEach(data => {
    lec = new lecture();
    lec.setNormalMode(
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
      data[6],
      data[7],
      data[8],
      data[9],
    );
    lectures.push(lec)
  });
  let datas2 = [];
  lectures.forEach(lec => {
    data = fetchLectureDetail(lec.lectureNumber);
    datas2.push(data);
  });
  for (data of datas2) {
    data = await data;
    let lec = lectures.find(lec => lec.lectureNumber === data[0]);
    lec.setDetailMode(
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
    );
  }
  let timeTable = new weekTimeTable();
  timeTable.setAllFromArr(lectures);
  timeTable.render();
}
main();