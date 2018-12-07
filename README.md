# CountryGame https://johnmarkley.github.io/CountryGame/
A simple web application that pulls information from a API serviced by https://restcountries.eu/. Created with ReactJS & Bootstrap.

## Challenges
Excluding the fact that this was my first dive into React, the biggest challenge of this project was having to fix a rare bug where the same country would be listed more than once as an option for users to select. Although it was a rare occurance, it was one that would break the game. 

My solution was that instead of grabbing options individually, I created a for loop that would randomly select a country and compare it with the array to ensure that the country wasn't already an option. This solution also creates flexibility in regards to choosing how many options I want there to be, allowing me to in the future create multiple difficulties where the user can choose how many potential answers they want to pick from.

        while(randomChoices.length < 4){
          const randomOpt = this.state.countries[Math.floor(Math.random()*this.state.countries.length)]
          if(!randomChoices.includes(randomOpt.name)){
             randomChoices.push(randomOpt.name);
        }

# TODO
- Fix bug: Nepal flag white area is transparent.
- Add difficulty slider.
