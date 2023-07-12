const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?limit=1&list=top_rated_english_250';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3d73a62809msh2aaaeab14d79a03p1edeabjsn3ff2daa48d59',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
	}
};

function RandomMovie(name,year,rating,numVotes) {
    this.name = name;
    this.year = year;
    this.rating = rating;
    this.numVotes = numVotes;
}




function getRandomMovie(url,options){
    try {
        fetch(url, options)
        .then(response =>  response.json())
        .then(data=> data.results[0])
        .then(data =>{
            const ratingUrl = `https://moviesdatabase.p.rapidapi.com/titles/${data.id}/ratings` 
            fetch(ratingUrl,options)
            .then(response => response.json())
            .then(rating=>{
                console.log(rating.results)
                return new RandomMovie(data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes)
            })

            console.log(data)
        })
    } catch (error) {
        console.error(error);
    }
}


async function hello(url,options){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.results[0])
    } catch (error) {
        console.error(error);
    }
}



console.log(getRandomMovie(url,options))


