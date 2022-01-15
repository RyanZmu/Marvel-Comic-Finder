'use strict'

// Reference API Call: https://gateway.marvel.com/v1/public/characters?name=Thor&apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1

//  endpoints: /events /stories /series /comics      

//Ideas for API Project
/*
1. An app that can search for any marvel character, returning a portrait, description, comics they were including in.

-Cards to display the heroes and then have a way to rollover the cards and reveal more info, IE Comics and so forth.

2. Team building app, Allow the user to choose super heroes from a random pool, assembling a team of their favorites. If they dont like the current selection, allow them to reroll. Also after making a team of 5, then display a random comic book for each hero.

Final Draft: 

Randomly display five cards and have the search field above. When user searches, clear the cards and make the searched hero's info display and the 5 cards go away.(make it look nice as they leave the page, at some point)

*/
// Notes: after getting character, we need to grab the id for the other calls.

// OOJS-Programming with some Functional if needed. Try to really make this site look nice, even try SASS/LESS if possible.

//Structure character.data.results(array of objects)

// HTML Structure of card:

/* <main>
<!--Send superHeroCard here-->
<article>
    <h4>name</h4>
    <hr>
    <img src="" alt="">
    <hr>
    <section>desp</section>
    <button>Show Comics</button>
    <button>Show Events</button>
    <button>Show Stories</button>
</article>
</main> */

//Elements
const mainDisplay = document.querySelector('main')
const searchButton = document.querySelector('.userSearch')
const userHeroInput = document.querySelector('.heroName')
const heroForm = document.querySelector('#superSearch')



const eventDisplay = document.querySelector('.eventContainer')
const seriesDisplay = document.querySelector('.seriesContainer')
//
userHeroInput.value = '' //default state for search form

class SuperHero {
    constructor(name) {
        this.name = name
        this.id;
        this.description;
        this.comics;
        this.events;
        this.series;
        this.thumbnail;
    }

    buildHero (heroSearched) {
        
        console.log(heroSearched)

        this.name = heroSearched.data.results.map(hero => hero.name)// array of names
        this.id = heroSearched.data.results.map(hero => hero.id)[0]// use the first id for now.

        
        if (this.id === undefined) { //if character isn't found as typed
           userHeroInput.value = 'Sorry, Try A Different Name!'
           return setTimeout(() => userHeroInput.value = '',1000)
        }

        this.description = heroSearched.data.results.map(hero => hero.description).join(' ')
       
        this.thumbnail = heroSearched.data.results.map(hero => hero.thumbnail.path)
        //array of thumbnails the user can click through, add a next and previous button later on.
        
        this.comics = heroSearched.data.results.filter(hero => hero.comics) 
        //array of comic objects
        
        this.events =  heroSearched.data.results.filter(hero => hero.events)

        this.series =  heroSearched.data.results.filter(hero => hero.series)

        console.log(this.id)
        //Function to build what the user will see.
        this.buildHeroCard()
    }

    fetchInfo (fetchUrl) {
        fetch(fetchUrl)
        .then(response => response.json())
        .then(hero => {
            this.buildHero(hero)
        })
    }

    createCard(heroName) {
        const whiteSpace = /\s/g //checking for spaces using regex
        heroName = this.name.replace(whiteSpace,'%20').toLowerCase()
        
       let fetchUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroName}&apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1`

        this.fetchInfo(fetchUrl)        
    }

    buildHeroCard () {
        //Elements to display
        const heroCard = document.createElement('article')
        heroCard.classList.add('heroCard')
        heroCard.dataset.name = this.name[0]

        // const comicDisplay = document.createElement('aside')
        // comicDisplay.classList.add('comicContainer')
        // heroCard.append(comicDisplay)

        const heroHeader = document.createElement('h4')
        heroHeader.innerHTML = `${this.name[0]}`
        heroCard.prepend(heroHeader)

        const heroImage = document.createElement('img')
        heroImage.src = this.thumbnail[0] + '.jpg'
        // using [0] so we start at first image in the array of thumbnails
        heroImage.classList.add('heroImage')
        heroCard.append(heroImage)

        //Button for changing picures
        const pictureButtonContainer = document.createElement('div')
        pictureButtonContainer.classList.add('pictureButtonContainer')

        const nextPicture = document.createElement('button')
        nextPicture.classList.add('nextPicture')

        const prevPicture = document.createElement('button')
        prevPicture.classList.add('prevPicture')

        pictureButtonContainer.append(prevPicture,nextPicture)
        heroCard.append(pictureButtonContainer)

        nextPicture.textContent = 'Next Picture'
        prevPicture.textContent = 'Prev Picture'
        prevPicture.style.visibility = 'hidden' // hide prev button until the user clicks for the next picture

        //logic for changing picture of character.
        let heroImageIndex = 0
        //index so names change with our thumbnails
        let heroNameIndex = 0

        nextPicture.addEventListener('click', () => {
            let imagesAvailable = this.thumbnail.length
            
            if (heroImageIndex < imagesAvailable) {
                heroImageIndex ++
                heroNameIndex ++
                heroHeader.innerHTML = `${this.name[heroNameIndex]}`
                prevPicture.style.visibility = 'visible'

            }if (heroImageIndex === imagesAvailable) {
                heroImageIndex = 0
                heroNameIndex = 0
                heroHeader.innerHTML = `${this.name[heroNameIndex]}`
            }  
            
            //this if statement will make the prev button become hidden once we hit the end of our array of thumbnails.
            //Placed at the end so it gets checked last.
            if (heroImageIndex === 0) {
                prevPicture.style.visibility = 'hidden'
            }
            //
            // debugger

            //ensures we get a valid thumbnail image
            if (this.thumbnail !== undefined){
            heroImage.src = this.thumbnail[heroImageIndex] + '.jpg'
            }
            
        })

        prevPicture.addEventListener('click', () => {
            let imagesAvailable = this.thumbnail.length

            //this if statement will make the prev button hidden if we go from the second thumbnail displayed to the first.
            //Place at the beginning so it gets checked first.
            if (heroImageIndex === 1) {
                prevPicture.style.visibility = 'hidden'
            }
            //

            if (heroImageIndex < imagesAvailable && heroImageIndex > 0) {
                heroImageIndex--
                heroNameIndex--
                heroHeader.innerHTML = `${this.name[heroNameIndex]}`
            }if (heroImageIndex === imagesAvailable) {
                heroImageIndex = 0
                heroNameIndex = 0
            }
            
            // debugger
            if (this.thumbnail !== undefined){
            heroImage.src = this.thumbnail[heroImageIndex] + '.jpg'
            }
            
        })  

        //container so we can manipulate show buttons and the descriptions location
        const showButtonContainer = document.createElement('div')
        showButtonContainer.classList.add('showButtonContainer')
        heroCard.append(showButtonContainer)

        const heroDesp = document.createElement('details')
        if (this.description === ' '|| this.description === '') {
        heroDesp.innerHTML = 'No Bio Given'
        }else {
            heroDesp.innerHTML = this.description
        }
        showButtonContainer.append(heroDesp)

        //Event Listeners to Attach - turn these into classes possibly.
        const comicButton = document.createElement('button')
        comicButton.addEventListener('click',() => {
            fetch(`https://gateway.marvel.com/v1/public/characters/${this.id}/comics?apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1`)
            .then(response => response.json())
            .then(comics => this.comicClick(comics))
        })
        comicButton.innerText = 'Show Comics'
        showButtonContainer.append(comicButton)

        const eventButton = document.createElement('button')
        eventButton.addEventListener('click', () => {
            fetch(`https://gateway.marvel.com/v1/public/characters/${this.id}/events?apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1`)
            .then(response => response.json())
            .then(events => this.eventClick(events))
        })
        eventButton.innerText = 'Show Events'
        showButtonContainer.append(eventButton)

        const seriesButton = document.createElement('button')
        seriesButton.addEventListener('click', () => {
            fetch(`https://gateway.marvel.com/v1/public/characters/${this.id}/series?apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1`)
            .then(response => response.json())
            .then(series => this.seriesClick(series))
        })
        seriesButton.innerText = 'Show \b Series'
        showButtonContainer.append(seriesButton)

        mainDisplay.prepend(heroCard) //displays hero card
    }

    // make a comicCard class possibly - Recode this function to work in each card INDIViDUALlY
    comicClick (comics) {
    comics.data.results.map(comic => {
         console.log(comic)

        //  const comicDisplay = document.querySelector('aside')
         const comicDisplay = document.createElement('aside')
         comicDisplay.classList.add('comicDisplay')
     
         const heroCard = document.querySelector(`article`)

        heroCard.append(comicDisplay)
         const comicHeading = document.createElement('h5')
        //  comicHeading.classList.add('comicCard')
         const comicPriceHeading = document.createElement('h5')
    
        comicHeading.innerText = comic.title
        comicDisplay.prepend(comicHeading) //puts comics into the comic container
        heroCard.append(comicDisplay)

        comicPriceHeading.innerText = comic.prices.map(comic => {
            const type = comic.type
            const price = comic.price

            return `${type} - ${price}`
        })
        
        comicHeading.append(comicPriceHeading)

        let comicLink = document.createElement('a') //link to purchasing the comic
        comicDisplay.append(comicLink)
        let comicUrl = comic.urls[0].url     
        comicLink.href = comicUrl
        comicLink.target = '_blank'

        const comicImage = document.createElement('img') 
        comicImage.classList.add('comicImage')
        comicLink.append(comicImage)// appending image to the link allows for the entire image to be our link.
        comicImage.src = comic.thumbnail.path + '.jpg' 
    })
 
    }
    eventClick (event) {
     event.data.results.map(event => {
        const heroCard = document.querySelector('article')

        const eventDisplay = document.createElement('aside')
        eventDisplay.classList.add('eventDisplay')

        const eventImage = document.createElement('img')
        eventImage.classList.add('eventImage')
        eventImage.src = event.thumbnail.path + '.jpg'
        eventDisplay.append(eventImage)

        heroCard.append(eventDisplay)
        })
    }

    seriesClick (series) {
     series.data.results.map(series => {
        const seriesImage = document.createElement('img')
        seriesImage.classList.add('seriesImage')
        seriesDisplay.append(seriesImage)
        seriesImage.src = series.thumbnail.path + '.jpg'
        })
    }
}


//Search Button
searchButton.addEventListener('click', event => {
    event.preventDefault()

    if (document.querySelector('article') === null){
   new SuperHero(userHeroInput.value).createCard()
    }else {
        document.querySelector('article').remove()
        new SuperHero(userHeroInput.value).createCard()
    }

   heroForm.reset()
})

//Maybe make it we can cycle through each comic indivually and display all the info that way/









//Tests
// let heroTester = new SuperHero('Black Widow')
// heroTester.createCard()

// let heroTesterTwo = new SuperHero('Iron Man')
// heroTesterTwo.createCard()

// let heroTesterThree = new SuperHero('Thor')
// heroTesterThree.createCard()

// let heroTesterFour = new SuperHero('Daredevil')
// heroTesterFour.createCard()

// let heroTesterFive = new SuperHero('Captain America')
// heroTesterFive.createCard()

// let heroTesterSix = new SuperHero('Spider-Man')
// heroTesterSix.createCard()

