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