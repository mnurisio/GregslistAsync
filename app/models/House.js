import { AppState } from "../AppState.js"


export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.creator = data.creator
    }


    get Card() {
        return `
<div class="col-md-4">
    <div class="card shadow-sm">
        <img class="card-img p-2" src="${this.imgUrl}" alt="">
        <div class="card-body">
            <p class="text-center fw-bold">
                ${this.bedrooms} bedroom(s), ${this.bathrooms} bathroom(s), ${this.levels} levels
            </p>
            <p class="mb-0">
                Built in ${this.year} | $${this.price}
            </p>
            <p>${this.description}</p>
            <div class="d-flex justify-content-between">
                <div>
                    <span>${this.creator.name}</span>
                    <img class="profile-picture profile-picture-sm" src="${this.creator.picture}"
                        alt="A beautiful picture of homes" />
                </div>
            </div>
            ${this.DeleteButton}
        </div>
    </div>
</div>
`}

    get DeleteButton() {
        if (AppState.account != null && AppState.account.id == this.creatorId) {
            return `
      <button onclick="app.HouseController.deleteHouse('${this.id}')" class="btn btn-danger w-100 mt-2" title="Delete House"><i class="mdi mdi-delete-forever"></i></button>`
        }
        return ''
    }
}