const mainContaint = async (searchCard) => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const cardInfo = data.posts;
    const searchCardData = searchCard;

    if (searchCardData) {
        singleCard(searchCardData, "empty")
    }
    else {
        singleCard(cardInfo);
    }
}
mainContaint();



const singleCard = (card, empty) => {
    const mainDiv = document.getElementById("single-card");

    if (empty) {
        mainDiv.innerHTML = "";
    }


    if (card.length === 0) {
        errorMassage();
    }
    else {
        const errorMassage = document.getElementById("errorMassage");
        errorMassage.classList.add("hidden")
    }

    card.forEach(element => {

        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex bg-pink-300 p-8 m-4">
        <img src="${element.image}" class="h-10 w-10 rounded-full mr-4">
        
        <div>
        <div>
             <span>#${element.category}</span>
             <span class="pl-2">Author : ${element.author.name}</span>
        </div>
        <div>
        <p class="font-bold">${element.title}</p>
        <p class="pt-2">${element.description}</p>
       </div>
            <div class="flex justify-between pt-4">
                <div>
                    <i class="fa-solid fa-comment px-2"></i>${element.comment_count}
                    <i class="fa-solid fa-eye px-2"></i>${element.view_count}
                    <i class="fa-solid fa-clock px-2"></i>${element.posted_time}
                </div>
                <div class="bg-pink-200 px-2 rounded-full">
                   <i class="fa-solid fa-square-envelope" onclick="selectCard('${element.title}','${element.view_count}')"></i>
                </div>
            
            </div>
        </div>
        </div>
        
        `

        mainDiv.appendChild(div);
        // console.log(element);
    });
};


const selectCard = (title, view) => {
    const markCard = document.getElementById("mark-card");

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex bg-cyan-100 rounded-lg py-6 px-4 m-4 shadow-neutral-600 shadow-lg shadow-indigo-500/50">
        <p>${title}</p>
        <p class="pl-4"><i class="fa-solid fa-eye px-4"></i>${view}</p>
    </div>
    `
    markCard.appendChild(div)
    // console.log(markCard.childElementCount)
    
    const readCount = document.getElementById("readCount");
    readCount.innerText = markCard.childElementCount;
}

// error or empty massage 
const errorMassage = () => {
    let errorDiv = document.getElementById("errorMassage");
    errorDiv.classList.remove("hidden")
}



// search sections

const searchItem = () => {
    const searchFile = document.getElementById("searchFild").value;
    searchCard(searchFile);
}

const searchCard = async (search) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
    const data = await res.json();

    mainContaint(data.posts);

}


// latest posts section 

const latestPosts = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    latestSinglePost(data);
}
latestPosts();

const latestSinglePost = (data) => {
    const mainDiv = document.getElementById("latestSection");
    data.forEach(element => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        
        <div class="card bg-base-100 w-96 shadow-xl mx-2">
            <figure>
                <img
                src="${element.cover_image}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
               <div>
                    <i class="fa-solid fa-calendar-days pr-2"></i> 
                    <span>${element.author.posted_date ? element.author.posted_date : "No Data Found"}</span>
               </div>
                <h2 class="card-title text-2xl font-bold">Shoes!</h2>
                <h2 class="font-bold">${element.title}</h2>
                <p>${element.description}</p>

                <div class="flex">
                    <img src="${element.profile_image}" class="h-10 w-10 rounded-full mr-4">
                    <div>
                    <p>${element.author.name}
                    <p>${element.author.designation ? element.author.designation : "Designation Not Found"}</p>
                    </div>
                <div>
            </div>
        </div>
       
        `

        mainDiv.appendChild(newDiv);
    })
}

