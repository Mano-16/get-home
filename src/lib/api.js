export const sendData=async(url,value)=>{
      console.log(value)
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const FullData = await getHomeData(url,"GET");
        return FullData;
      } else {
        console.log("Error failed");
      }
}
// load data
export const getHomeData = async (url,method) => {
  const response = await fetch(
    url,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }
  );
  
  if (response.ok) {
    const data = await response.json();
    const HomeFullData=[]
   
    for( const key in data){
      HomeFullData.push({
        key:key,
        id:data[key].id,
        contactNumber: data[key].contactNumber,
        HomeImage: data[key].HomeImage,
        HomeName:data[key].HomeName,
        Location:data[key].Location,
        Price:data[key].Price,
        PricePerTime:data[key].PricePerTime,
        Rating:data[key].Rating,
        Timing:data[key].Timing,
        HomeType:data[key].HomeType,
        Relationship:data[key].relationship,
        BHK:data[key].BHK
      })
    }
    return HomeFullData;
  } else {
    console.log("Error failed");
  }
};


export const RemoveData = async (url) => {
  const response = await fetch(
    url,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }
  )

}

// Filter Functions

export const FilterTwoArrays=(DataArray,FilterArray)=>{
  const EmptyArray=[]
  console.log(DataArray,FilterArray)
 DataArray.map((DA)=>{
    let HA=DA;
    FilterArray.map((FA)=>{
      console.log(FA)
      if(HA[Object.keys(FA).toString()] === FA[Object.keys(FA).toString()]) {
        EmptyArray.push(HA)
      }
      else{
        if(EmptyArray.length){
          let A=0;
          let Index;
          EmptyArray.map((EA,i)=>{
            if(HA.key===EA.key){
              Index=i;
              A=1
            }
          })
          if(A){
            EmptyArray.splice(0,1)
          }
        }
      }
    })
    
  }
  )
  let distinct = []
for (var i = 0; i < EmptyArray.length; i++)distinct.push(EmptyArray[i].key)
   distinct = [...new Set(distinct)]
  console.log(EmptyArray)
  return EmptyArray

}