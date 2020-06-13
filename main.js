const liElement = document.querySelectorAll('li')
const selectElement = document.querySelector('#selectCountry')

function updateStats(){
fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then(numbers => {
        const globalStats = numbers.Global
        const countriesArr = numbers.Countries

        for(country of countriesArr){
            const { Country, TotalDeaths, TotalRecovered, TotalConfirmed, Date, CountryCode} = country
            selectElement.innerHTML += `<option value="${CountryCode}">${Country}</option>`
            
            selectElement.addEventListener('change', (event) => {
                if(event.target.value === CountryCode){
                liElement[0].innerHTML = `<span>${TotalDeaths}</span>`
                liElement[1].innerHTML = `<span>${TotalConfirmed}</span>`
                liElement[2].innerHTML = `<span>${TotalRecovered}</span>`
                }
            })
        }
    })
}
updateStats()
