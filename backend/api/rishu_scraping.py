from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from typing import List
import os
from bs4 import BeautifulSoup
import requests
from datetime import datetime


def scrapeRegistrationStatus() -> List[List[str]]:
    # chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument("--headless")
    # chrome_options.add_argument("--disable-gpu")
    driver = webdriver.Remote(
        command_executor=os.environ["SELENIUM_URL"], options=webdriver.ChromeOptions()
    )
    print("Accessing the target page...")
    driver.get(
        "https://eduweb.sta.kanazawa-u.ac.jp/portal/Public/Regist/RegistrationStatus.aspx?year=2024&lct_term_cd=21"
    )

    # 期間外の場合は終了
    check_out_of_term = driver.find_element(
        By.ID, "ctl00_phContents_ucRegistrationStatus_ucEmptyBox_lbl_lbl"
    ).text
    if check_out_of_term == "期間外対象となるデータは存在しません。":
        print("Out of term")
        return []

    # ドロップダウンリストの要素を取得
    print("Selecting the dropdown list...")
    dropdown = Select(
        driver.find_element(By.ID, "ctl00_phContents_ucRegistrationStatus_ddlLns_ddl")
    )
    # オプションを全件に変更
    print("Changing the dropdown list to 'All'...")
    dropdown.select_by_index(0)

    # テーブル行の要素を取得
    print("Getting the table rows...")
    records = driver.find_elements(
        By.CSS_SELECTOR, "#ctl00_phContents_ucRegistrationStatus_tbGridView table tr"
    )

    # 各行のすべての列を取得
    arr = list(
        map(
            lambda record: list(
                map(
                    lambda column: column.text,
                    record.find_elements(By.CSS_SELECTOR, "td, th"),
                )
            ),
            records,
        )
    )
    return arr


def scrapeSyllabus(course_numbering: str):
    current_year = datetime.now().year
    url = f"https://eduweb.sta.kanazawa-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx?student=1&lct_year={current_year}&lct_cd={course_numbering}&je_cd=1&ActingAccess=1"
    res = requests.get(url)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html.parser")
    selected = soup.findAll(class_="ItemName_value")
    record = []
    for i in selected:
        record.append(i.text)
    selected = soup.findAll(id="ctl00_phContents_Detail_LctDetail").text
    record.append(selected)
    record.append(url)
    return record
