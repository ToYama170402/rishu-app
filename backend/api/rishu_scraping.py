from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from typing import List
import os
from bs4 import BeautifulSoup
import requests
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


def scrapeRegistrationStatus() -> List[List[str]]:
    logger.info("connecting selenium")
    time = datetime.now()
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--log-level=3")
    chrome_options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Remote(
        command_executor=os.environ["SELENIUM_URL"], options=chrome_options
    )
    logger.info(f"access selenium: {datetime.now() - time}")
    logger.info("Accessing the target page...")
    driver.get("about:blank")
    driver.delete_all_cookies()
    driver.get(
        "https://eduweb.sta.kanazawa-u.ac.jp/portal/Public/Regist/RegistrationStatus.aspx?year=2024&lct_term_cd=21"
    )

    try:
        # ドロップダウンリストの要素を取得
        logger.info("Selecting the dropdown list...")
        dropdown = Select(
            driver.find_element(
                By.ID, "ctl00_phContents_ucRegistrationStatus_ddlLns_ddl"
            )
        )
        # オプションを全件に変更
        logger.info("Changing the dropdown list to 'All'...")
        dropdown.select_by_index(0)

        # テーブル行の要素を取得
        logger.info("Getting the table rows...")
        records = driver.find_elements(
            By.CSS_SELECTOR,
            "#ctl00_phContents_ucRegistrationStatus_tbGridView table tr",
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
        driver.quit()
        return arr

    except Exception as e:
        driver.quit()
        raise e


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
