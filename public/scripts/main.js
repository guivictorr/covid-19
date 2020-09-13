class Data {
    constructor(){
        this.liElement = document.querySelectorAll('li')
        this.selectElement = document.querySelector('#selectCountry')
        this.textBox = document.querySelector('.text-box')
    }

    async run(){
        await this.fillSelect()
        await this.renderGlobalData()
        this.selectAction()
        this.getDate()
    }

    async getData(){
        const response = await fetch('https://api.covid19api.com/summary')
        const data = await response.json()

        return data
    }

    async fillSelect(){
        const data = await this.getData()
        const countries = data.Countries
        
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

    async renderCountryData(value){
        const data = await this.getData()
        const countries = data.Countries

        countries.map(country => {
            const { CountryCode, TotalConfirmed, TotalDeaths, TotalRecovered } = country
            if(CountryCode === value) this.renderValues(TotalDeaths, TotalConfirmed, TotalRecovered)
        })
    }

    async renderGlobalData(){
        const data = await this.getData()
        const globalData = data.Global
        const {TotalDeaths,TotalConfirmed,TotalRecovered} = globalData

        this.renderValues(TotalDeaths,TotalConfirmed,TotalRecovered)
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

    renderDate(formatedDate){
        this.textBox.innerHTML += `<p>Última atualização: <span>${formatedDate}</span></p>`
    }

    formatDate(date){   
        const dateArr = date.split('T')[0].split('-')
        const year = dateArr[0]
        const month = dateArr[1]
        const day = dateArr[2]

        const formatedDate = `${day}/${month}/${year}`

        return formatedDate
    }

    async getDate(){
        const data = await this.getData()
        const { Date } = data

        const formatedDate = this.formatDate(Date)
        this.renderDate(formatedDate)
    }
}

const data = new Data()
data.run()