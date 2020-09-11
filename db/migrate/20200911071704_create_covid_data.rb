class CreateCovidData < ActiveRecord::Migration[6.0]
  def change
    create_table :covid_data do |t|
      t.date :日付
      t.integer :累計罹患者数
      t.integer :新規罹患者数
      t.integer :北海道
      t.integer :青森県
      t.integer :岩手県
      t.integer :宮城県
      t.integer :秋田県
      t.integer :山形県
      t.integer :福島県
      t.integer :茨城県
      t.integer :栃木県
      t.integer :群馬県
      t.integer :埼玉県
      t.integer :千葉県
      t.integer :東京都
      t.integer :神奈川県
      t.integer :新潟県
      t.integer :富山県
      t.integer :石川県
      t.integer :福井県
      t.integer :山梨県
      t.integer :長野県
      t.integer :岐阜県
      t.integer :静岡県
      t.integer :愛知県
      t.integer :三重県
      t.integer :滋賀県
      t.integer :京都府
      t.integer :大阪府
      t.integer :兵庫県
      t.integer :奈良県
      t.integer :和歌山県
      t.integer :鳥取県
      t.integer :島根県
      t.integer :岡山県
      t.integer :広島県
      t.integer :山口県
      t.integer :徳島県
      t.integer :香川県
      t.integer :愛媛県
      t.integer :高知県
      t.integer :福岡県
      t.integer :佐賀県
      t.integer :長崎県
      t.integer :熊本県
      t.integer :大分県
      t.integer :宮崎県
      t.integer :鹿児島県
      t.integer :沖縄県
      t.timestamps
    end
  end
end
