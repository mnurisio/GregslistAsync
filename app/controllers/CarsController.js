import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";



export class CarsController {
  constructor() {
    console.log('🚙🎮');
    this.fetchCars()
    // this.drawCars()
    AppState.on('cars', this.drawCars)
    AppState.on('account', this.showForm)
    AppState.on('account', this.drawCars)
  }

  async fetchCars() {
    try {
      await carsService.fetchCars()
    } catch (error) {
      console.error(error)
    }
  }

  async postCar() {
    try { // NOTE try to complete this code

      event.preventDefault()
      const formElm = event.target
      console.log('➕🚙', formElm);
      // const formData = {
      //   make: formElm.make.value,
      //   model: formElm.model.value,
      //   color: formElm.color.value
      // }
      const formData = getFormData(formElm) // speed up the creation of formdata with this utility
      console.log('🚙📃', formData);
      await carsService.postCar(formData)
      Pop.toast("Car Listing Created", 'success', 'top')
      formElm.reset()
    } catch (error) { // IF an error occurs, abandon the try code, and run this instead
      console.error("😱 Oh no!", error)
      const errorMessage = `😱Oh no! ${error.message} \n ${error.response.data.error}`
      Pop.toast(errorMessage, 'error', 'top', 8000, true)
      // alert(error.response.data.error)
      console.error(error)
    }

  }

  async deleteCar(carId) {
    try {
      const confirmed = await Pop.confirm("Are you sure you want to delete this car?", 'Someone might be interested one day', 'Hell Yeah', 'question'
      )
      if (!confirmed) return
      console.log('🔥🚙', carId);
      await carsService.deleteCar(carId)
      Pop.toast('Car deleted', 'info')
    } catch (error) {
      const errorMessage = `😱Oh no! ${error.message} \n ${error.response.data.error}`
      Pop.toast(errorMessage, 'error', 'top', 8000, true)
      console.error(error)
    }
  }

  drawCars() {
    console.log('✏️🚙');
    const carsListingsElm = document.getElementById('car-listings')
    carsListingsElm.innerHTML = ''
    AppState.cars.forEach(car => carsListingsElm.innerHTML += car.Card)
  }

  showForm() {
    const carFormElm = document.getElementById('create-car-form')
    carFormElm.classList.remove('d-none')
  }
}