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
    const prefectures = nomalizePrefectures(data.prefectures, data.new_patient_person_number)
    for (let i=1;i<=47;i++) {
      areas.push(
        {
          "code": i, 
          "color": prefecturesConvertRGB(prefectures[i-1]) 
        }
      )
    }
    return areas
  }

  function main(){
    const data = defineData()
    const areas = defineAreas(data)
  
    const d = new jpmap.japanMap(document.getElementById("japan-map"), {
      areas: areas,
      height: 270,
      lineWidth: 0,
      onSelect: function(data){
        alert(data.name);
      }
    });
  }

  main()
})


