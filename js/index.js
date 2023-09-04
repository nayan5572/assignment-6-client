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

// call id
const handleLoadData = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();


    const cardContainer = document.getElementById('card-container');
    const emptyPage = document.getElementById('empty-page');

    cardContainer.innerHTML = " ";
    emptyPage.innerHTML = " ";

    if (data.data.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="mt-12">
                <img class="ml-[45%]" src="images/Icon.png" alt="">
                <p class="font-bold text-4xl mt-7 text-center">Oops!! Sorry, There is no <br> content here</p>
            </div>
        `;
        emptyPage.appendChild(div);
    }
    else {
        data.data.forEach((videos) => {

            // I trying sorting array object
            // const sortedData = data.data.sort((a, b) => {
            //     const viewsA = parseInt(a.others.views);
            //     const viewsB = parseInt(b.others.views);
            //     return viewsB - viewsA;
            // });

            // sortedData.forEach(object => {
            //     console.log(object.others.views);
            // });

            const hours = Math.floor(videos.others.posted_date / 3600);
            const minutes = Math.floor((videos.others.posted_date % 3600) / 60);
            const seconds = videos.others.posted_date % 60;

            const timeString = `${hours ? `${hours} hour${hours !== 1 ? 's' : ''}, ` : ''}${minutes ? `${minutes} minute${minutes !== 1 ? 's' : ''}, ` : ''}${seconds} seconds${seconds !== 1 ? ' ' : ''}`;



            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card bg-base-100 shadow-xl">
                <figure>
                    <img class="h-[200px]" src=${videos.thumbnail} />
                    
                </figure>
                <div class="text-right -mt-8 mr-6">
                    <span class="bg-[#171717] text-white py-1 px-[5px] rounded">${timeString}</span>
                </div>
                
                    <div class="card-body">
                        <h2 class="card-title">
                            <img class="h-[50px] rounded-full" src=${videos.authors[0].profile_picture} />
                            <div class="font-medium">${videos.title}</div>
                        </h2>
                        <div class="flex ">
                            <span>${videos.authors[0].profile_name}</span>
                            <div class="ml-2">${videos.authors[0].verified ? `<img src="images/meta.png" class="w-5 h-5" alt="" />` : " "}</div>
                        </div>
                        <div class="card-actions">
                            <div class="">${videos.others.views} Views</div>
                        </div>
                    </div>
                </div>
                `;
            cardContainer.appendChild(div);
        });
    }


};

// this code is for blog
const blogPost = () => {
    window.location.href = 'blog.html';
}

handleCategory();
handleLoadData("1000");