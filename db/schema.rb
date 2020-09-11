# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_11_071704) do

  create_table "articles", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.text "src"
    t.text "url", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["title"], name: "index_articles_on_title"
  end

  create_table "covid_data", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.date "日付"
    t.integer "累計罹患者数"
    t.integer "新規罹患者数"
    t.integer "北海道"
    t.integer "青森県"
    t.integer "岩手県"
    t.integer "宮城県"
    t.integer "秋田県"
    t.integer "山形県"
    t.integer "福島県"
    t.integer "茨城県"
    t.integer "栃木県"
    t.integer "群馬県"
    t.integer "埼玉県"
    t.integer "千葉県"
    t.integer "東京都"
    t.integer "神奈川県"
    t.integer "新潟県"
    t.integer "富山県"
    t.integer "石川県"
    t.integer "福井県"
    t.integer "山梨県"
    t.integer "長野県"
    t.integer "岐阜県"
    t.integer "静岡県"
    t.integer "愛知県"
    t.integer "三重県"
    t.integer "滋賀県"
    t.integer "京都府"
    t.integer "大阪府"
    t.integer "兵庫県"
    t.integer "奈良県"
    t.integer "和歌山県"
    t.integer "鳥取県"
    t.integer "島根県"
    t.integer "岡山県"
    t.integer "広島県"
    t.integer "山口県"
    t.integer "徳島県"
    t.integer "香川県"
    t.integer "愛媛県"
    t.integer "高知県"
    t.integer "福岡県"
    t.integer "佐賀県"
    t.integer "長崎県"
    t.integer "熊本県"
    t.integer "大分県"
    t.integer "宮崎県"
    t.integer "鹿児島県"
    t.integer "沖縄県"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
