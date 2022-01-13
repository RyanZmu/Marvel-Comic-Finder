# Marvel-Comic-Finder

**Purpose Of Project**

- Communicate with Marvel Comic API to get information on any Marvel character.

- Allow a user to look up any character and return a card a bio and buttons that once pressed will reveal comic books,series that character is included in and also story lines of comics the character is included in.

**Current Functions**

<details>

- User can search for any marvel character, they will be displayed a card with the characters picture,bio, buttons for showing comics/storylines and series that character is involved in. 
  
- When user clicks the characters picture, it will cycle through all available pictures.
  
- When a button is clicked, the user will be displayed the comic book cover, its price and also a description if available in the database.

</details>

**To-Do**

<details>

- Display every comic book as a seperate div displaying the name/description if available and the price of the comic.

- Place a link to offical marvel on the character inside the cards.-Done
  
- Fix edge cases with the names the user is searching for, for instance spider man should work like Spider-Man.
(Idea: Possibly have an if statement so when a name isn't recognized and includes MAN as the last three indexes(letters), add a hypen at the start of man and try the fetch once more. )
</details>

<details>

**Bugs**

</details>

- When ciicking comic button or series button, the 

**API**

<details>
https://developer.marvel.com/
</details>
