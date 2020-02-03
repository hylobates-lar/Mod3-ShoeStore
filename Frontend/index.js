// document.addEventListener("DOMContentLoaded", () => {
//     const shoes = document.querySelector("#shoe-list")
//     const shoeCard = document.getElementById("#main-shoe")
    
//     fetch('http://localhost:3000/shoes')
//         .then(response => response.json())
//         .then(shoes => shoes.forEach(addToList)
//     )
    
//     function addToList(shoe) {
//         const shoeListItem = document.createElement("li")
//         shoeListItem.dataset.id = shoe.id,
//         shoeListItem.innerHTML = `<li>${shoe.name}</li>`,
//         shoes.appendChild(shoeListItem)
//     }

//     shoes.addEventListener("click", event => {
//         let shoe = event.target.closest
//         console.log(`${shoe.name}`)
//         renderShoe()})

    
//     function renderShoe(shoe) {
//         fetch(`'http://localhost:3000/shoes/${shoe.id}'`)
//             .then(response => response.json())
//             .then(shoe => console.log(shoe))

        
//         shoeCard.innerHTML = `
//             const image = document.getElementById("#shoe-image")
//             image = ${shoe.image}

//             const name = document.getElementById("#shoe-name")
//             name = ${shoe.name}

//             const description = document.getElementById("#shoe-description")
//             description = ${shoe.description}

//             const price = document.getElementById("#shoe-price")
//             price = ${shoe.price}

//             const reviews = document.getElementById("#reviews-list")
//             const reviewsList = document.createElement("li")
//             reviews = ${shoe.reviews.content}
//         `
//             shoe.append(shoeCard)
//     }
// })

document.addEventListener("DOMContentLoaded", () =>{
    getShoes()

    function getShoes() {
        fetch("http://localhost:3000/shoes")
        .then(r => r.json())
        .then(shoes => renderShoeList(shoes))
    }

    function renderShoeList(shoes) {
        console.log(shoes);

        let shoeList = document.querySelector("#shoe-list")
        renderOneShoe(shoes[0])

        shoes.forEach(shoe => {
            let shoeLi = document.createElement("li")
            shoeLi.className = "list-group-item"
            shoeLi.innerText = shoe.name
            shoeLi.addEventListener('click', () => renderOneShoe(shoe))

            shoeList.append(shoeLi)
        })
    }

    function renderOneShoe(shoe){
        const mainShoe = document.querySelector("#main-shoe")
        
        mainShoe.innerHTML = 
        `<img class="card-img-top" id="shoe-image" src="${shoe.image}">
        <div class="card-body">
        <h4 class="card-title" id="shoe-name">${shoe.name}</h4>
        <p class="card-text" id="shoe-description">${shoe.description}</p>
            <p class="card-text"><small class="text-muted" id="shoe-price">${shoe.price}</small></p>
            
            <div class="container" id="form-container">
            <form id="new-review">
            <div class="form-group">
                    <textarea class="form-control" id="review-content" rows="3"></textarea>
                    <input type="submit" class="btn btn-primary"></input>
                    </div>
                    </form>
            </div>

            </div>
            <h5 class="card-header">Reviews</h5>
            <ul class="list-group list-group-flush" id="reviews-list">
                <!-- REVIEWS GO HERE -->
            </ul>`
            let reviews = shoe.reviews.forEach(review => renderReview(review)) 
          
            let form = document.querySelector('#new-review') 
            form.addEventListener("submit", (event) => postReview(shoe, event))
    }

    function renderReview(review) {
        let reviewsList = document.querySelector("#reviews-list")
        let reviewLi = document.createElement("li")
        reviewLi.className = "list-group-item"
        reviewLi.innerText = review.content
        reviewsList.append(reviewLi)
    }

    function postReview(shoe, event) {
        event.preventDefault()
        let formContent = event.target.querySelector("#review-content").value
        
        fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ content: formContent })
        })
        .then(response => response.json())
        .then(review => renderReview(review))
        let form = document.querySelector('#new-review') 
        form.reset()
    }



})