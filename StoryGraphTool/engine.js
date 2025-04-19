class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));

        //this.visitedLocations = new Set();
        this.passwordFound = new Set();
        this.timerInterval = null;

        fetch(storyDataUrl).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass)
            }
        );
    }

    hasPassword(password) {
        return this.passwordFound.has(password);
    }

    markPasswordFound(password) {
        console.log(this.passwordFound.add(password));
        this.passwordFound.add(password);
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        this.scene.create(data);

        if (location.inputRequired) {
            gameContainer.innerHTML += `
                <div id="input-container">
                    <label for="user-input">Type the code to unlock the drawer:</label>
                    <input type="text" id="user-input" placeholder="Enter code here..."/>
                    <button onclick="checkInput('${locationKey}')">Submit</button>
                </div>
                <p id="feedback"></p>
            `;
        }
    }

    addChoice(action, data) {
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        button.onclick = () => {
            while(this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild)
            }
            this.scene.handleChoice(data);
        }
    }

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    show(msg) {
        let div = document.createElement("div");
        div.innerHTML = msg;
        this.output.appendChild(div);
    }
}

class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() { }

    update() { }

    handleChoice(action) {
        console.warn('no choice handler on scene ', this);
    }
}
let aquiredInformation = new Set();
