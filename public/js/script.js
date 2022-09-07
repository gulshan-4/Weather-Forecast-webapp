async function weather(){
    let btn = document.querySelector('.go');
    const description = document.querySelector('.wdesc')
    const response = await fetch('/getweather');
    response.json().then((data)=>{
        const description = document.querySelector('.wdesc')
        const city = document.querySelector('.city')
        const icon = document.querySelector('.icon')
        const temprature = document.querySelector('.temprature')
        description.innerText = `${data.description}`
        city.innerText = data.cityName
        icon.innerHTML = `<img src=${data.iconUrl}>`
        temprature.innerText = data.temp
        console.log(data)
    })
}

weather()