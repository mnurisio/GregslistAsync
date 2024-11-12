import { AppState } from "../AppState.js";
import { houseService } from "../services/HouseService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";


export class HouseController {
    constructor() {
        this.fetchHouses()
        AppState.on('houses', this.drawHouse)
        AppState.on('account', this.showForm)
        AppState.on('account', this.drawHouse)

    }

    async postHouse() {
        try {
            window.event.preventDefault()
            const formElm = event.target
            const formData = getFormData(formElm)
            await houseService.postHouse(formData)
            Pop.toast("House Listing Created", 'success', 'top')
        } catch (error) {
            console.error(error)
            Pop.toast('fix yo mistakes', 'error', 'top', 6000, true)
        }
    }

    async fetchHouses() {
        try {
            await houseService.fetchHouses()
        } catch (error) {
            console.error(error)
        }
    }

    async deleteHouse(houseID){
        try {
            const confirmed = await Pop.confirm("you really wanna delete your crib?", 'it can be on MTV one day', 'I dont want the fame', 'question')
            if(!confirmed) return
            await houseService.deleteHouse(houseID)
            Pop.toast('Crib deleted', 'info')
        } catch (error) {
            Pop.toast('fix yo mistakes')
            console.error(error);
        }
    }


    drawHouse() {
        const houseListingElem = document.getElementById('house-listings')
        houseListingElem.innerHTML = ''
        AppState.houses.forEach(house => houseListingElem.innerHTML += house.Card)
    }

    showForm(){
        const houseFormElem = document.getElementById('create-house-form')
        houseFormElem.classList.remove('d-none')
    }

}