import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js"


class HouseService{


   async fetchHouses() {
        const response = await api.get('api/houses')
        console.log('homes', response.data);
        const houses = response.data.map(houseData => new House(houseData))
        console.log('post map houses', houses);
        AppState.houses = houses
        
    }


}

export const houseService = new HouseService()