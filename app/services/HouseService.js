import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js"


class HouseService {

    async postHouse(formData) {
        const response = await api.post('api/houses', formData)
        const createdHouse = new House(response.data)
        AppState.houses.push(createdHouse)
    }


    async fetchHouses() {
        const response = await api.get('api/houses')
        console.log('homes', response.data);
        const houses = response.data.map(houseData => new House(houseData))
        console.log('post map houses', houses);
        AppState.houses = houses
    }

    async deleteHouse(houseID){
        const response = await api.delete(`api/houses/${houseID}`)
        console.log('delete house', response.data);
        const houseToRemove = AppState.houses.find(house => house.id == houseID)
        const indexToRemove = AppState.houses.indexOf(houseToRemove)
        AppState.houses.splice(indexToRemove, 1)
    }


}

export const houseService = new HouseService()