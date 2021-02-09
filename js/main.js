let listContainer = document.getElementById('table-list')
let tableHeaderElement = document.getElementById('table-header')
let searchFormElement = document.getElementById('searchForm')
let countryInputElement = document.getElementById('country')
let cityInputElement = document.getElementById('city')

let liListClasses = ['bg-gray-50', 'px-4', 'py-5', 'sm:grid', 'sm:grid-cols-3', 'sm:gap-4', 'sm:px-6', 'border-t', 'border-gray-200']
let dtListClasses = ['text-sm', 'font-medium', 'text-gray-500']
let ddListClasses = ['mt-1', 'text-sm', 'text-gray-900', 'sm:mt-0', 'sm:col-span-2']
let tableTitleClasses = ['text-lg', 'leading-6', 'font-medium', 'text-gray-900']
let paragraphClasses = ['mt-1', 'max-w-2xl', 'text-sm', 'text-gray-500']

let currentTime = new Date().toLocaleTimeString();



searchFormElement.addEventListener('submit', function (event) {
    event.preventDefault()

    listContainer.textContent = ''
    tableHeaderElement.textContent = ''

    let countryInputValue = countryInputElement.value
    let cityInputValue = cityInputElement.value

    async function prayerTime(shahar, mamlakat, mazhab){

        let response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${shahar}&country=${mamlakat}&school=${mazhab}`)
        response = await response.json()

        let newTitleElement = document.createElement("h3")
        newTitleElement.classList.add(...tableTitleClasses)
        newTitleElement.textContent = `${shahar} Prayer Times`

        let newPElement = document.createElement("p")
        newPElement.classList.add(...paragraphClasses)
        newPElement.textContent = `Current Time: ${currentTime}`

        tableHeaderElement.appendChild(newTitleElement)
        tableHeaderElement.appendChild(newPElement)

        for(let vaqt in response.data.timings){
            let newDivElement = document.createElement('div')
            newDivElement.classList.add(...liListClasses)
            let newDtElement = document.createElement('dt')
            newDtElement.classList.add(...dtListClasses)
            newDtElement.textContent = vaqt
            let newDdElement = document.createElement('dd')
            newDdElement.classList.add(...ddListClasses)
            newDdElement.textContent = response.data.timings[vaqt]

            newDivElement.appendChild(newDtElement)
            newDivElement.appendChild(newDdElement)
            listContainer.appendChild(newDivElement)
        }

    }

    prayerTime(cityInputValue, countryInputValue, 1)
})