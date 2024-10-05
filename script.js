const loadAllPets = async() =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json();
    displayAllPets(data.pets)
}

const displayAllPets = (pets) =>{
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = ""
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 border">
                    <figure class="px-6 pt-6">
                        <img class="w-full rounded-2xl" src=${pet.image} alt="Shoes" class="rounded-xl" />
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

const categoryBtn = async(categoryName)=>{
    document.getElementById('pets-container').innerHTML = "";
    document.getElementById('loading').classList.remove('hidden');

    setTimeout(function() {
        document.getElementById('loading').classList.add('hidden')
        displayByCategory(data.data)
    }, 2000);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName?categoryName:'not found'}`);
    const data = await res.json();
}

const displayByCategory = async(pets)=>{

    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = "";

    

    pets.forEach(e => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 border">
                    <figure class="px-6 pt-6">
                        <img class="w-full rounded-2xl" src=${e.image} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold">${e.pet_name}</h2>
                        <div class="text-description">
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/breed.png" alt="">
                                <p>Breed: ${e.breed?e.breed:"Not Found"}</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/calendar.png" alt="">
                                <p>Birth: ${e.date_of_birth?e.date_of_birth:"Not Found"}</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/gander.png" alt="">
                                <p>Gender: ${e.gender}</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/dollar.png" alt="">
                                <p>Price: ${e.price?e.price +'$':"Not Available"}</p>
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


const categories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json();
    displayCategories(data.categories)
}

const displayCategories = (category) =>{
    const categoriesConatiner = document.getElementById('categories');
    category.forEach(e => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="categoryBtn('${e.category}')" class="cursor-pointer flex items-center gap-2 bg-gray-100 py-10 md:px-20 lg:px-24 rounded-3xl hover:rounded-full justify-center font-inter">
                    <img class="w-14" src=${e.category_icon} alt="">
                    <h2 class="text-xl font-black">${e.category}</h2>
                </div>
        `
        categoriesConatiner.appendChild(div)
    });
}
categories()
loadAllPets()