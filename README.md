# Marvel-Comic-Finder

**Purpose Of Project**

- Communicate with the Marvel Comic API to get information on any Marvel character.

- Allow a user to look up any character and return a card with a bio and buttons that once pressed will reveal comic books,series that character is included in and also story lines of comics the character is included in.

**Current Functions**

<details>

- User can search for any marvel character, they will be displayed a card with the characters picture,bio, buttons for showing comics/storylines and series that character is involved in. 
  
- When user clicks the characters picture, it will cycle through all available pictures.
  
- When a button is clicked, the user will be displayed the comic book cover, its price and also a description if available in the database.

</details>

**To-Do**

<details>

- Display every comic book as a seperate div displaying the name/description if available and the price of the comic. - Done

- Place a link to offical marvel on the character inside the cards.-Done
  
- When changing the thumbnail for the character, also change the name in the header of the card to be accurate to the thumbnail. Instead of displaying all of the names at once. - Done

(Idea: Have the click event for next and previous, also handle changing the header name. Have the default header name as the first index of the name array and then increment it or decrement it accordingly, while having the cards header display the correct name.) 

- Make the webpage overall more attractive now that my Minimum Viable Product has been reached.

- Add a way for the user to hide the comic/event or series dislays when pressing the Show button again, also if they press Show Events after Show Comics, lets remove the comics and replace with events. -Priority

(Idea #1: Have ONE display instead of indiviual displays and just have my comics/event or series fill that display based on which button was pressed. Clear out the display if there is already items there and replace with the new content.)

(Idead #2: Once Show Comics button is pressed, change text to Hide Comics and then have the website hide that display. This way the user can choose to have all three displayed if needed. Easier to implement since I can keep the displays as is.) 

</details>

**Bugs**

<details>
- When ciicking comic button or series button, all comics end up in the first card's display. -Fixed

- When looking up comics for a character that has a name with more than two words, a DOM error is being thrown. - Fixed

- Fix edge cases with the names the user is searching for, for instance spider man should work like Spider-Man. - Priority

(Idea: Possibly have an if statement so when a name isn't recognized and includes MAN as the last three indexes(letters), add a hypen at the start of man and try the fetch once more. )

</details>

**API**

<details>
https://developer.marvel.com/
</details>
