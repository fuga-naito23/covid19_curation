class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :title, null: false, index: true
      t.text :src, null: false
      t.text :url, null: false
      t.timestamps
    end
  end
end
