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

// HTML Structure:

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
const comicDisplay = document.querySelector('.comicContainer')
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
           userHeroInput.value = 'Sorry, Try A Different Name!  '
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
        heroCard.dataset.name = this.name

        const heroHeader = document.createElement('h4')
        heroHeader.innerHTML = `${this.name}`
        heroCard.append(heroHeader)

        const heroImage = document.createElement('img')
        heroImage.src = this.thumbnail[0] + '.jpg'
        heroImage.classList.add('heroImage')
        heroCard.append(heroImage)


        //Button for changing picures
        const nextPicture = document.createElement('button')
        nextPicture.classList.add('nextPicture')
        const prevPicture = document.createElement('button')
        prevPicture.classList.add('prevPicture')

        heroCard.append(nextPicture,prevPicture)

        nextPicture.textContent = 'Next Picture'
        prevPicture.textContent = 'Prev Picture'
        prevPicture.style.visibility = 'hidden' // hide prev button until the user clicks for the next picture

        //logic for changing picture of character.
        let heroImageIndex = 0
        nextPicture.addEventListener('click', () => {
            let imagesAvailable = this.thumbnail.length
            prevPicture.style.visibility = 'visible'

            if (heroImageIndex < imagesAvailable) {
                heroImageIndex++
            }if (heroImageIndex === imagesAvailable) {
                heroImageIndex = 0
            }
            // debugger
            if (this.thumbnail !== undefined){
            heroImage.src = this.thumbnail[heroImageIndex] + '.jpg'
            }
        })
        
        prevPicture.addEventListener('click', () => {
            let imagesAvailable = this.thumbnail.length

            if (heroImageIndex < imagesAvailable && heroImageIndex > 0) {
                heroImageIndex--
            }if (heroImageIndex === imagesAvailable) {
                heroImageIndex = 0
            }
            // debugger
            if (this.thumbnail !== undefined){
            heroImage.src = this.thumbnail[heroImageIndex] + '.jpg'
            }
        })
       

        const heroDesp = document.createElement('details')
        if (this.description === ' '|| this.description === '') {
        heroDesp.innerHTML = 'No Bio Given'
        }else {
            heroDesp.innerHTML = this.description
        }
        heroCard.append(heroDesp)

        //Event Listeners to Attach - turn these into classes possibly.
        const comicButton = document.createElement('button')
        comicButton.addEventListener('click',() => {
            fetch(`https://gateway.marvel.com/v1/public/characters/${this.id}/comics?apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1`)
            .then(response => response.json())
            .then(comics => this.comicClick(comics))
        })
        comicButton.innerText = 'Show Comics'
        heroCard.append(comicButton)

        const eventButton = document.createElement('button')
        eventButton.addEventListener('click', () => {
            fetch(`https://gateway.marvel.com/v1/public/characters/${this.id}/events?apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1`)
            .then(response => response.json())
            .then(events => this.eventClick(events))
        })
        eventButton.innerText = 'Show Events'
        heroCard.append(eventButton)

        const seriesButton = document.createElement('button')
        seriesButton.addEventListener('click', () => {
            fetch(`https://gateway.marvel.com/v1/public/characters/${this.id}/series?apikey=cecb0667f3786d500e442a8d4990b71e&hash=8152e0c81bfdf8b93856bf07eca79912&ts=1`)
            .then(response => response.json())
            .then(series => this.seriesClick(series))
        })
        seriesButton.innerText = 'Show Series'
        heroCard.append(seriesButton)
        
        this.displayHeroCard(heroCard)
    }

    displayHeroCard (heroCard) {
        heroCard.classList.add('card')
        mainDisplay.append(heroCard)
    }

    //click class possibly?
    comicClick (comics) {
    comics.data.results.map(comic => {
         console.log(comic)

         const comicHeading = document.createElement('h5')
         comicHeading.classList.add('comicCard')
         const comicPriceHeading = document.createElement('h5')
           
        comicHeading.innerText = comic.title
        comicDisplay.prepend(comicHeading)

        comicPriceHeading.innerText = comic.prices.map(comic => {
            const type = comic.type
            const price = comic.price

            return `${type} - ${price}`
        })
        
        comicHeading.append(comicPriceHeading)

        const comicImage = document.createElement('img')
        comicImage.classList.add('comicImage')
        comicHeading.append(comicImage)
        comicImage.src = comic.thumbnail.path + '.jpg'

       
       
        comicLink.addEventListener('click', () => {
            let comicLink = document.createElement('a')
            let comicUrl = comic.urls[0].url     

            comicLink.append(comicImage)

           comicLink.href = comicUrl
           

            console.log(comicLink.getAttribute('href'));
        })
    })
 
    }
    eventClick (event) {
     event.data.results.map(event => {
        const eventImage = document.createElement('img')
        eventImage.classList.add('eventImage')
        eventDisplay.append(eventImage)
        eventImage.src = event.thumbnail.path + '.jpg'
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

   new SuperHero(userHeroInput.value).createCard()
 
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

