const to = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    // console.log(data.posts);
    singleCard(data.posts)
}
to();

const singleCard = (card) => {
    // console.log(card);
    const mainDiv = document.getElementById("single-card");

    const to = card.forEach(element => {
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
        <p class="pt-10">${element.description}</p>
       </div>
            <div class="flex justify-between pt-28">
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
    console.log(title, view)
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex bg-cyan-100 rounded-lg py-10 px-4 m-4 shadow-neutral-600 shadow-lg shadow-indigo-500/50">
        <p>${title}</p>
        <p class="pl-4"><i class="fa-solid fa-eye px-4"></i>${view}</p>
    </div>
    `
    markCard.appendChild(div)
}