# -*- coding: utf-8 -*-

# spreadseetを扱うためのmodule
import gspread
import json
from oauth2client.service_account import ServiceAccountCredentials

# mysqlを扱うためのmodule
import MySQLdb

# 日付を扱うためのmodule
import time
from datetime import *

# 環境変数の呼び出しのためのmodule
import os
import subprocess

#2つのAPIを記述しないとリフレッシュトークンを3600秒毎に発行し続けなければならない
scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']

#認証情報設定
#ダウンロードしたjsonファイル名をクレデンシャル変数に設定（秘密鍵）
credentials = ServiceAccountCredentials.from_json_keyfile_name(os.environ['SPR_JSON_KEY'], scope)

#OAuth2の資格情報を使用してGoogle APIにログインします。
gc = gspread.authorize(credentials)

#共有設定したスプレッドシートキーを変数[SPREADSHEET_KEY]に格納する。
SPREADSHEET_KEY = '10MFfRQTblbOpuvOs_yjIYgntpMGBg592dL8veXoPpp4'

#共有設定したスプレッドシートのシート2を開く                    
workbook = gc.open_by_key(SPREADSHEET_KEY)
worksheet_list = workbook.worksheets()
worksheet = workbook1.get_worksheet(2)



def get_row_values(i):

    '''

    Parameters
    ----------
    i : type(integer)
        スプレッドシートから取得したい行番号

    Returns
    -------
    row_values : tyoe(list)
        １行の結果をrow_valuesに入れて返す。        
    '''
    row_values = worksheet.row_values(i)
    return row_values

# １列全てを取得し最終行の行番号を引数にしてget_row_valuesを呼び出す
col_list = worksheet.col_values(1)
# 最新行のデータを取得している。
latest_values = get_row_values(len(col_list))


def insert_covid_data(latest_values):
    '''
    Parameters
    ----------
    latest_values : type(list)
        スプレッドシートの最新行のデータを取得してきている
    SQLに対してスプレで取得してきたデータを格納する関数
    '''
    connect = MySQLdb.connect(host='localhost', port=3306, user='root', passwd='' , db='covid19_curation_development', charset='utf8')
    cur = connect.cursor()

    
    timestamp = datetime.now().strftime( '%Y-%m-%d %H:%M:%S' )

    insert_sql = 'INSERT INTO covid_data(日付, 累計罹患者数, 新規罹患者数, 北海道, 青森県, 岩手県, 宮城県, 秋田県, 山形県, 福島県, 茨城県, 栃木県, 群馬県, 埼玉県, 千葉県, 東京都, 神奈川県, 新潟県, 富山県, 石川県, 福井県, 山梨県, 長野県, 岐阜県, 静岡県, 愛知県, 三重県, 滋賀県, 京都府, 大阪府, 兵庫県, 奈良県, 和歌山県, 鳥取県, 島根県, 岡山県, 広島県, 山口県, 徳島県, 香川県, 愛媛県, 高知県, 福岡県, 佐賀県, 長崎県, 熊本県, 大分県, 宮崎県, 鹿児島県, 沖縄県, created_at,updated_at) values ("{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{}","{created_at}","{updated_at}")'.format(latest_values[0], latest_values[1], latest_values[2], latest_values[3], latest_values[4], latest_values[5], latest_values[6], latest_values[7], latest_values[8], latest_values[9], latest_values[10], latest_values[11], latest_values[12], latest_values[13], latest_values[14], latest_values[15], latest_values[16], latest_values[17], latest_values[18], latest_values[19], latest_values[20], latest_values[21], latest_values[22], latest_values[23], latest_values[24], latest_values[25], latest_values[26], latest_values[27], latest_values[28], latest_values[29], latest_values[30], latest_values[31], latest_values[32], latest_values[33], latest_values[34], latest_values[35], latest_values[36], latest_values[37], latest_values[38], latest_values[39], latest_values[40], latest_values[41], latest_values[42], latest_values[43], latest_values[44], latest_values[45], latest_values[46], latest_values[47], latest_values[48], latest_values[49],created_at=timestamp,updated_at=timestamp)
    cur.execute(insert_sql)
    connect.commit()
    cur.close
    connect.close

insert_covid_data(latest_values)




