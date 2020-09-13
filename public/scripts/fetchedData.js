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