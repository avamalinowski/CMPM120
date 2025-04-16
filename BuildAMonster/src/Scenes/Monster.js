class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 30;

        this.leftHandX = this.bodyX - 125;
        this.leftHandY = this.bodyY + 60;

        this.rightHandX = this.bodyX + 125;
        this.rightHandY = this.bodyY + 60;

        this.leftLegX = this.bodyX - 75;
        this.leftLegY = this.bodyY + 125;

        this.rightLegX = this.bodyX + 75;
        this.rightLegY = this.bodyY + 125;

        this.leftEyeX = this.bodyX - 40;
        this.leftEyeY = this.bodyY - 20;

        this.rightEyeX = this.bodyX + 40;
        this.rightEyeY = this.bodyY - 20;

        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 30;

        this.leftHornX = this.bodyX - 60;
        this.leftHornY = this.bodyY - 70;

        this.rightHornX = this.bodyX + 60;
        this.rightHornY = this.bodyY - 70;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
        
      
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        //my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_yellowB.png");
        my.sprite.leftHand = this.add.sprite(this.leftHandX, this.leftHandY, "monsterParts", "arm_blueC.png");
        my.sprite.leftHand.flipX = true;

        my.sprite.rightHand = this.add.sprite(this.rightHandX, this.rightHandY, "monsterParts", "arm_blueC.png");
        my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterParts", "eye_psycho_dark.png");
        my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY,"monsterParts", "eye_psycho_dark.png");

        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_yellowC.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_yellowC.png");

        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouthB.png");
        my.sprite.mouth = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.mouth.flipY = true;
 
        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.leftHornY, "monsterParts", "detail_blue_horn_small.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.rightHornY, "monsterParts", "detail_blue_horn_small.png");
        this.keys = this.input.keyboard.addKeys('S,F,A,D');
        my.sprite.smile.visible = false;
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        
        
        if (this.keys.S.isDown){
            my.sprite.smile.visible = true;
            my.sprite.mouth.visible = false;
        }
        if (this.keys.F.isDown){
            my.sprite.mouth.visible = true;
            my.sprite.smile.visible = false;
        }
        if (this.keys.A.isDown){
          for(const i in my.sprite){
            my.sprite[i].x -= 2;
          }  
        }
        if (this.keys.D.isDown){
            for(const i in my.sprite){
                my.sprite[i].x += 2;
            }
        }
    }   

}