const liElement = document.querySelectorAll('li')
const selectElement = document.querySelector('#selectCountry')
const textBox = document.querySelector('.text-box')

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateStats() {
    fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(numbers => {
            const countriesArr = numbers.Countries
            
            function formatDate(date){
                const year = date.slice(0,4)
                const month = date.slice(5,7)
                const day = date.slice(8,10)
                formatedDate = `${day}/${month}/${year}`

                textBox.innerHTML += `<p>Última atualização: <span>${formatedDate}</span></p>`
            }
            formatDate(numbers.Date)

            function updateGlobal() {
                const globalStats = numbers.Global
                const { TotalDeaths, TotalRecovered, TotalConfirmed, } = globalStats
                liElement[0].innerHTML = `<span>${numberWithCommas(TotalDeaths)}</span>`
                liElement[1].innerHTML = `<span>${numberWithCommas(TotalConfirmed)}</span>`
                liElement[2].innerHTML = `<span>${numberWithCommas(TotalRecovered)}</span>`
            }
            updateGlobal()

            for (country of countriesArr) {
                const { Country, TotalDeaths, TotalRecovered, TotalConfirmed,CountryCode } = country
                
                selectElement.innerHTML += `<option value="${CountryCode}">${Country}</option>`

                selectElement.addEventListener('change', (event) => {
                    if (event.target.value === CountryCode) {
                        liElement[0].innerHTML = `<span>${numberWithCommas(TotalDeaths)}</span>`
                        liElement[1].innerHTML = `<span>${numberWithCommas(TotalConfirmed)}</span>`
                        liElement[2].innerHTML = `<span>${numberWithCommas(TotalRecovered)}</span>`
                    } else if (event.target.value === 'global') {
                        updateGlobal()
                    }

                })
            }
        })
}
updateStats()
