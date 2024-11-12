import { houseService } from "../services/HouseService.js";


export class HouseController{
    constructor(){
        this.fetchHouses()
        
    }

    async fetchHouses(){
        try{
            await houseService.fetchHouses()
        } catch (error){
            console.error(error)
        }
        
    }
}