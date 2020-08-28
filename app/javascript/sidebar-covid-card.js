document.addEventListener("turbolinks:load", function(){

  function defineData(){
    const data = {
      "date" : "2020/08/27",
      "total_patient_person_number": 65769,
      "new_patient_person_number": 865,
      "prefectures" : [10,2,0,1,0,0,7,8,1,18,69,45,250,66,1,8,13,13,0,6,2,12,39,6,5,27,94,22,4,0,0,0,1,1,6,4,0,0,0,64,2,7,6,1,1,2,36]
    }
    return data
  }

  function prefecturesConvertRGB(prefecture){
    function heatMapColorforValue(value){
      var h = (1.0 - value) * 240
      return "hsl(" + h + ", 100%, 50%)";
    }
    


    return heatMapColorforValue(prefecture)
  }

  function nomalizePrefectures(prefectures, new_patient_person_number){
    const max = Math.max(...prefectures)
    const prefs = prefectures.map(function(x){
        return x / max;
    })
    return prefs
  }

  function defineAreas(data){
    let areas = []
    const prefectures = data.prefectures
    const prefecturesNomailse = nomalizePrefectures(data.prefectures, data.new_patient_person_number)

    const prefectureNames = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"]
    for (let i=1;i<=47;i++) {
      areas.push(
        {
          "code": i, 
          "color": prefecturesConvertRGB(prefecturesNomailse[i-1]),
          "name" : prefectureNames[i-1],
          "data" : prefectures[i-1]
        }
      )
    }
    return areas
  }

  function main(){
    const data = defineData()
    const areas = defineAreas(data)
    
    areas.forEach(function(area){
      const html = `
      <div class="covid-card">
        <p>本日の新規感染者数</p>
        <div class="covid-card-main">
          <div class="covid-card-main__pref">${area.name}</div>
          <div class="covid-card-main__data" style="color: ${area.color}">${area.data}人</div>
        </div>
      </div>
      `

      const dom = document.getElementById("covid-cards")
      dom.insertAdjacentHTML("beforeend",html)
    })

    const totalDom_html = `
      ${data.new_patient_person_number}人
    `
    const totalDom = document.getElementsByClassName("covid-card-main__data--total")[0]
    totalDom.innerHTML = totalDom_html
  }

  main()
})


