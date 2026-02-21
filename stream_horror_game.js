// STREAM HORROR GAME
// A text-based horror game about a streamer encountering supernatural events

class StreamHorrorGame {
    constructor() {
        this.player = {
            name: '',
            sanity: 100,
            streamViewers: 10,
            streamQuality: 'good',
            inventory: [],
            alive: true
        };
        
        this.gameState = {
            day: 1,
            time: '20:00', // 24-hour format
            location: 'bedroom',
            eventCount: 0,
            hasEncounteredHorror: false
        };
        
        this.horrorEvents = [
            "A shadow quickly passes behind you in the reflection of your monitor",
            "Your chat starts typing messages you didn't write: 'GET OUT'",
            "The temperature in your room drops suddenly",
            "Your stream suddenly glitches and shows an image of a figure standing behind you",
            "You hear whispers coming from your headset that aren't from any of your viewers",
            "Your recording software captures audio of someone breathing heavily in the room, but you're alone",
            "The lights flicker and for a moment you see a face in your webcam that isn't yours",
            "Your stream gets an unexpected viewer named 'TheWatcher' who posts increasingly disturbing comments",
            "Your mouse moves on its own, clicking through your personal files",
            "You notice scratches appearing on your desk in real-time, spelling out 'STOP STREAMING'"
        ];
        
        this.horrorEventsEscalated = [
            "The figure from your stream glitch is now clearly visible in your room",
            "Your chat is flooded with 'THEY ARE BEHIND YOU' from hundreds of accounts",
            "An invisible force starts typing on your keyboard, sending disturbing messages to your audience",
            "The entity from your webcam approaches closer, its face becoming clearer",
            "Your stream shows live footage of other rooms in your house with figures moving about",
            "The whispers in your headset become clear voices telling you terrible things",
            "Your screen starts showing live footage of people from your past who have wronged you",
            "The scratches on your desk start bleeding",
            "'TheWatcher' now appears in your peripheral vision",
            "Your entire streaming setup begins operating on its own, broadcasting whatever it wants"
        ];
    }
    
    startGame() {
        console.log("=================================");
        console.log("     STREAM HORROR GAME");
        console.log("=================================");
        console.log("You are a popular streamer preparing for tonight's broadcast.");
        console.log("Tonight feels different though...");
        console.log("");
        
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.question("What is your streaming username? ", (name) => {
            this.player.name = name;
            console.log(`\nWelcome ${this.player.name}! Your stream begins at 8 PM...\n`);
            this.beginStream();
            
            rl.close();
        });
    }
    
    beginStream() {
        console.log("=== LIVESTREAM STARTED ===");
        console.log(`${this.player.name} is now live!`);
        console.log(`Current viewers: ${this.player.streamViewers}`);
        console.log(`Stream topic: Just Chatting`);
        console.log("=========================\n`);
        
        this.mainLoop();
    }
    
    mainLoop() {
        if (!this.player.alive) {
            this.endGame();
            return;
        }
        
        if (this.player.sanity <= 0) {
            console.log("\n!!! YOUR SANITY HAS BEEN TOTALLY COMPROMISED !!!");
            console.log("You've lost touch with reality...");
            this.player.alive = false;
            this.endGame();
            return;
        }
        
        // Random chance for horror event
        if (Math.random() > 0.6) {
            this.triggerHorrorEvent();
        } else {
            this.normalStreaming();
        }
        
        // Increase tension over time
        setTimeout(() => {
            this.gameState.eventCount++;
            if (this.gameState.eventCount > 5) {
                this.gameState.hasEncounteredHorror = true;
            }
            this.mainLoop();
        }, 3000);
    }
    
    triggerHorrorEvent() {
        let event;
        if (this.gameState.hasEncounteredHorror) {
            event = this.horrorEventsEscalated[Math.floor(Math.random() * this.horrorEventsEscalated.length)];
        } else {
            event = this.horrorEvents[Math.floor(Math.random() * this.horrorEvents.length)];
        }
        
        console.log(`\n[STREAM EVENT] ${event}\n`);
        
        // Decrease sanity
        const sanityLoss = this.gameState.hasEncounteredHorror ? 15 : 8;
        this.player.sanity -= sanityLoss;
        console.log(`Sanity: ${this.player.sanity}/100`);
        
        // Viewer reactions
        if (Math.random() > 0.7) {
            const newViewers = Math.floor(Math.random() * 50) + 10;
            this.player.streamViewers += newViewers;
            console.log(`[ALERT] ${newViewers} new viewers joined! Total: ${this.player.streamViewers}`);
            console.log("(They love the mysterious atmosphere!)");
        }
        
        // Possible choices during horror event
        this.presentChoices();
    }
    
    normalStreaming() {
        const activities = [
            "Chatting with viewers",
            "Playing a horror game",
            "Reacting to memes",
            "Taking donations and reading messages",
            "Setting up better lighting",
            "Adjusting audio settings"
        ];
        
        const activity = activities[Math.floor(Math.random() * activities.length)];
        console.log(`[NORMAL] ${activity}`);
        
        // Small sanity gain from normal activities
        if (this.player.sanity < 100) {
            this.player.sanity += 2;
            if (this.player.sanity > 100) this.player.sanity = 100;
            console.log(`Sanity: ${this.player.sanity}/100`);
        }
    }
    
    presentChoices() {
        console.log("\n--- WHAT DO YOU DO? ---");
        console.log("1. Continue streaming (try to act normal)");
        console.log("2. Check behind you");
        console.log("3. End the stream");
        console.log("4. Interact with the horror");
        
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.question("Choose an action (1-4): ", (choice) => {
            switch(choice) {
                case '1':
                    console.log("\nYou try to keep streaming normally...");
                    if (Math.random() > 0.5) {
                        this.player.sanity -= 5;
                        console.log("But the situation is clearly affecting your performance.");
                    }
                    break;
                case '2':
                    console.log("\nYou slowly turn around...");
                    if (this.gameState.hasEncounteredHorror && Math.random() > 0.3) {
                        console.log("THERE'S SOMETHING RIGHT BEHIND YOU!");
                        this.player.sanity -= 25;
                        if (Math.random() > 0.7) {
                            console.log("It touches you...");
                            this.player.alive = false;
                        }
                    } else {
                        console.log("Nothing there... just paranoia?");
                        this.player.sanity -= 3;
                    }
                    break;
                case '3':
                    console.log("\nYou try to end the stream...");
                    if (this.gameState.hasEncounteredHorror) {
                        console.log("But your controls don't respond! The stream continues!");
                        this.player.sanity -= 10;
                    } else {
                        console.log("Smart choice. Ending the stream might be safest.");
                        this.player.sanity += 10;
                        this.endGame();
                    }
                    break;
                case '4':
                    console.log("\nYou decide to interact with the strange occurrences...");
                    if (Math.random() > 0.6) {
                        console.log("Surprisingly, this seems to calm things down slightly.");
                        this.player.sanity += 5;
                    } else {
                        console.log("That was a terrible idea!");
                        this.player.sanity -= 20;
                        if (Math.random() > 0.5) {
                            console.log("Something retaliates!");
                            this.player.alive = false;
                        }
                    }
                    break;
                default:
                    console.log("Invalid choice, continuing...");
            }
            
            rl.close();
        });
    }
    
    endGame() {
        console.log("\n=================================");
        console.log("         GAME OVER");
        console.log("=================================");
        
        if (!this.player.alive) {
            console.log("Your stream went offline suddenly...");
            console.log("Your last recorded moments are now viral on social media.");
            console.log("Some say they can still see your ghost in the archived streams.");
        } else if (this.player.sanity <= 0) {
            console.log("You've completely lost your mind.");
            console.log("Your fans are concerned about your wellbeing.");
            console.log("Your channel has been suspended indefinitely.");
        } else {
            console.log(`Thanks for playing, ${this.player.name}!`);
            console.log(`Final stats:`);
            console.log(`- Peak viewers: ${this.player.streamViewers}`);
            console.log(`- Sanity level: ${this.player.sanity}%`);
            console.log(`- Days survived: ${this.gameState.day}`);
            console.log(`- Horror events encountered: ${this.gameState.eventCount}`);
        }
        
        console.log("=================================");
    }
}

// Start the game if this file is run directly
if (require.main === module) {
    const game = new StreamHorrorGame();
    game.startGame();
}

module.exports = StreamHorrorGame;