const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadData('${category.category_id}')" class="tab bg-[#d3d2d2] rounded font-medium">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });

};

const handleLoadData = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    data.data.forEach((videos) => {
        console.log(videos.authors[0].verified);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure><img class="h-[200px]" src=${videos.thumbnail} /></figure>
        <div class="card-body">
            <h2 class="card-title">
                <img class="h-[50px] rounded-full" src=${videos.authors[0].profile_picture} />
                <div class="">${videos.title}</div>
            </h2>
            <div class="flex">
                <p>${videos.authors[0].profile_name}</p>
                <div class="">${videos.authors[0].verified? `<img src="images/meta.png" class="w-5 h-5" alt="" />`: " "}</div>
            </div>
            <div class="card-actions">
                <div class="">${videos.others.views} Views</div>
            </div>
        </div>
    </div>
        `;
        cardContainer.appendChild(div);
    });
};



{/* <img id="meta-verified" class="hidden w-5 h-5" src="images/meta.png" alt=""></img> */}
handleCategory();