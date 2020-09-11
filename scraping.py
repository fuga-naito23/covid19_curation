import requests
from bs4 import BeautifulSoup
import re

# MYsqlの接続準備

import MySQLdb
import time
from datetime import *


# 接続する 
connect = MySQLdb.connect(host='localhost', port=3306, user='root', passwd='' , db='covid19_curation_development', charset='utf8')


# カーソルを取得する
cur = connect.cursor()

# SQL（データベースを操作するコマンド）を実行する
# userテーブルから、HostとUser列を取り出す
sql = "select * from articles"
cur.execute(sql)





urlName = "https://www.google.com/search?q=%E3%82%B3%E3%83%AD%E3%83%8A&rlz=1C5CHFA_enJP853JP854&source=lnms&sa=X&ved=0ahUKEwiw3YHWw6vrAhWUxosBHSaNAo8Q_AUIDSgA&biw=1440&bih=821&dpr=2"
url = requests.get(urlName)
soup = BeautifulSoup(url.content, "html.parser")

print()

titles = soup.find_all(class_="rQMQod Xb5VRe")
urls = soup.find_all("a",class_="BVG0Nb")
images = soup.find_all("")
shin_urls = []
for elem in urls:
    url = re.split('&', elem.get('href'))
    rel_url = re.split('q=', url[0])
    shin_urls.append(rel_url[1])

timestamp = datetime.now().strftime( '%Y-%m-%d %H:%M:%S' )
for i in  range(len(titles)):
    insert_sql = 'INSERT INTO articles(title, src, url,created_at,updated_at) values ("{title}","{src}","{url}","{created_at}","{updated_at}")'.format(title=titles[i].get_text(), src='https://thebridge.jp/wp-content/uploads/2020/02/coronavirus_wikimedia_cc.jpg', url=shin_urls[i],created_at=timestamp,updated_at=timestamp)
    print(insert_sql)
    cur.execute(insert_sql)
 
connect.commit()
cur.close
connect.close






