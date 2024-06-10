// rishu-appのメインスクリプト

// 設定メニュー
const settingMenu = document.getElementById("setting-menu")

// 設定ボタンをクリックしてメニューを表示
const settingOpenButton = document.getElementById("setting-open")
settingOpenButton.addEventListener("click", () => {
  settingMenu.classList.add("setting-menu-wrap--visible");
})

// メニューのバツボタンをクリックしてメニューを非表示
const settingCloseButton = document.getElementById("setting-close")
settingCloseButton.addEventListener("click", () => {
  settingMenu.classList.remove("setting-menu-wrap--visible");
})

// フェッチしてレンダリング
fetchAll()
  .then(datas => {
    let lectures = []
    datas = parseSV(datas, "\t");
    datas.shift();
    datas.shift();
    datas.pop();
    for (data of datas) {
      const lec = new lecture(
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[8],
        data[9],
        data[10],
        data[11],
        data[12],
        data[13]
      )
      lectures.push(lec);
    }
    console.log(lectures.at(-1))
    let timeTable = new weekTimeTable()
    timeTable.setAllFromArr(lectures)
    console.log(timeTable)
    timeTable.render();
  })