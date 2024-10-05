const loadAllPets = async() =>{
    const response = await fetch(` https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json();
    displayAllPets(data.pets)
}

const displayAllPets = (pets) =>{
    const petsContainer = document.getElementById('pets-container');
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 border">
                    <figure class="px-10 pt-10">
                        <img src=${pet.image} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold">${pet.pet_name}</h2>
                        <div class="text-description">
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/breed.png" alt="">
                                <p>Breed: ${pet.breed?pet.breed:"Not Found"}</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/calendar.png" alt="">
                                <p>Birth: ${pet.date_of_birth?pet.date_of_birth:"Not Found"}</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/gander.png" alt="">
                                <p>Gender: ${pet.gender}</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/dollar.png" alt="">
                                <p>Price: ${pet.price?pet.price +'$':"Not Available"}</p>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="card-actions items-center justify-center">
                            <button class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg"><img
                                    src="images/like.png" alt=""></button>
                            <button
                                class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg">Adopt</button>
                            <button
                                class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg">Details</button>

                        </div>
                    </div>
                </div>
        
        `
        petsContainer.appendChild(div);
    });
}
loadAllPets()