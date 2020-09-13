
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

