import requests
from bs4 import BeautifulSoup
import re
import MySQLdb
import time
from datetime import *
import os


# 接続する 
connect = MySQLdb.connect(host='localhost', port=3306, user='root', passwd='' , db='covid19_curation_development', charset='utf8')
# カーソルを取得する
cur = connect.cursor()
# SQL（データベースを操作するコマンド）を実行する
# userテーブルから、HostとUser列を取り出す
sql = "select * from articles"
cur.execute(sql)


baseURL = "https://www.google.com/search?q=%E3%82%B3%E3%83%AD%E3%83%8A&rlz=1C5CHFA_enJP853JP854&source=lnms&sa=X&ved=0ahUKEwiw3YHWw6vrAhWUxosBHSaNAo8Q_AUIDSgA&biw=1440&bih=821&dpr=2"
requestURL = requests.get(baseURL)
soup = BeautifulSoup(requestURL.content, "html.parser")

titles = map(lambda x: x.get_text(),soup.find_all(class_="rQMQod Xb5VRe"))
doms = soup.find_all("a",class_="BVG0Nb")
images = soup.find_all("")

for title in titles:
    print(title)

for dom in doms[:1]:
    href = re.split('&', dom.get('href'))
    siteBaseURL = re.split('q=', href[0])[1]
    siteRequestURL = requests.get(siteBaseURL)
    soup = BeautifulSoup(siteRequestURL.content, "html.parser")
    topImgTag = soup.find_all("img")[0]
    print(topImgTag)
    img = topImgTag.get('src')
    req = requests.get(img)
    print(req.content)

    with open('/Users/tech-camp/workspace/covid19_curation/public/images/scraping/' + target.split('/')[-1], 'wb') as f:
        f.write(req.content)
        
connect.commit()
cur.close
connect.close






