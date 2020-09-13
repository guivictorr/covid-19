class FetchedData {
    constructor(){
        this.url = 'https://api.covid19api.com/summary'
    }

    async getAllData(){
        const response = await fetch('https://api.covid19api.com/summary')
        const data = await response.json()

        return data
    }

    async getGlobalData(){
        const allData = await this.getAllData()
        const globalData = allData.Global

        return globalData
    }

    async getCountriesData(){
        const allData = await this.getAllData()
        const countries = allData.Countries

        return countries
    }

    async getFullDate(){
        const data = await this.getAllData()
        const date = data.Date

        return date
    }
}

const Data = new FetchedData()

class RenderFormatedDate{
    constructor(){
        this.textBox = document.querySelector('.text-box')
        this.date = Data.getFullDate()
    }

    async formatDate(){
        const date = await this.date
        
        const dateArr = date.split('T')[0].split('-')
        const year = dateArr[0]
        const month = dateArr[1]
        const day = dateArr[2]

        const formatedDate = `${day}/${month}/${year}`

        this.renderDate(formatedDate)
    }

    renderDate(date){
        this.textBox.innerHTML += `<p>Última atualização: <span>${date}</span></p>`
    }
}

const Date = new RenderFormatedDate()
Date.formatDate()

class RenderData {
    constructor(){
        this.liElement = document.querySelectorAll('li')
        this.selectElement = document.querySelector('#selectCountry')

        this.globalData = Data.getGlobalData()
        this.countriesData = Data.getCountriesData()
    }

    async run(){
        await this.fillSelect()
        await this.renderGlobalData()
        this.selectAction()
    }
    
    async fillSelect(){
        const countries = await this.countriesData
        
        countries.map(country => {
            const {CountryCode, Country} = country
            this.selectElement.innerHTML += `<option value="${CountryCode}">${Country}</option>`
        })
    }

    async selectAction(){
        this.selectElement.addEventListener('change', event => {
            const targetValue = event.target.value

            if(targetValue !== 'global'){
                this.renderCountryData(targetValue)
            }else{
                this.renderGlobalData()
            }
        })
    }

    async renderGlobalData(){
        const globalData = await this.globalData
        const {TotalDeaths,TotalConfirmed,TotalRecovered} = globalData

        this.renderValues(TotalDeaths,TotalConfirmed,TotalRecovered)
    }

    async renderCountryData(value){
        const countries = await this.countriesData

        countries.map(country => {
            const { CountryCode, TotalConfirmed, TotalDeaths, TotalRecovered } = country
            if(CountryCode === value) this.renderValues(TotalDeaths, TotalConfirmed, TotalRecovered)
        })
    }

    renderValues(totalDeaths,totalConfirmed,totalRecovered){
        let recovered = this.numberWithCommas(totalRecovered)
        let confirmed = this.numberWithCommas(totalConfirmed)
        let deaths = this.numberWithCommas(totalDeaths)

        this.liElement[1].innerHTML = `<span>${confirmed}</span>`
        this.liElement[0].innerHTML = `<span>${recovered}</span>`
        this.liElement[2].innerHTML = `<span>${deaths}</span>`
    }

    numberWithCommas(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

const render = new RenderData()
render.run()