class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

//let passwordFound = new Set();
class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if ((!choice.needsPassword || this.engine.hasPassword(choice.needsPassword)) && 
                    (!choice.foundPassword || !this.engine.hasPassword(choice.foundPassword))) { // TODO: check if the choice is available
                    //console.log(passwordFound.size + "1");
                    //console.log(!choice.needsPassword + "2");
                    //console.log(hasPassword(choice.needsPassword) + "3");
                    //console.log(!choice.foundPassword + "4");
                    //console.log(!hasPassword(choice.foundPassword) + "5");
                    if (choice.foundPassword){
                        console.log("is this calling?");
                        this.engine.markPasswordFound(choice.foundPassword);
                    }
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }

    //hasVisited(key){
    //    if (this.engine.visitedLocations.has(key)){
    //        return true;
    //    }
    //}
}

//function hasPassword(object){
//    passwordFound.add(object);
//    console.log("function called and hopefully added object");
//}

class End extends Scene {
    create() {
        
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');