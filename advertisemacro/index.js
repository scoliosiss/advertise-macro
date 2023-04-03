ChatLib.chat("advertise macro loaded")

import { distanceToPlayer, lookAt, mc, prefix, RightClick, Sprint, stripRank, WalkForward } from "./utils";

let timetospam = false
let timetospam2 = false
let sayed = false
let timercountdown = Date.now()
let time = ((timercountdown - Date.now()) / 1000 + 10).toFixed(1)
let allEntity 
let publicmessage ="hello there people! i am looking for friends, please party me" // this is best setting for advertise macro!
let partymessage ="join my discord server please we are in vc right now! https://discord.gg/mbJse6Z5W6"
let delay=500

register("command", (...arg) => {
    if (arg[0] == "toggle") {ChatLib.chat(`${(timetospam=!timetospam) ? prefix + "&aadvertise" : prefix + "&cadvertise"}`); if (timetospam) ChatLib.say(`/warp dhub`)}
    if (arg[0] == "message") {
        if (arg[1] !== "public" && arg[1] !== "party") ChatLib.chat(prefix+"specify which message you are setting")
    }
    if (arg[0] == "delay") {
        if (arg[1] == null || isNaN(arg[1])) ChatLib.chat(prefix+"usage: /advertisemacro delay [number]")
        else {delay=arg[1]; ChatLib.chat(prefix+"advertise delay set to: "+delay)}
    }
    if (arg[0] == null) ChatLib.chat(prefix + "incorrect usage of /advertisemacro.\n&cusage:\n&c/advertisemacro toggle\n&c/advertisemacro message public [message]\n&c/advertisemacro message party [message]\n&c/advertisemacro delay [delay]\n")
}).setName("advertisemacro", true)

register('messageSent', (message, event) => {
    if (message.startsWith('/advertisemacro message public')) {
        publicmessage=message.replace('/advertisemacro message public ').replace("undefined","")
        ChatLib.chat(prefix+"public chat message set to: "+publicmessage)
    }
    if (message.startsWith('/advertisemacro message party')) {
        partymessage=message.replace('/advertisemacro message party ').replace("undefined","")
        ChatLib.chat(prefix+"party chat message set to: "+partymessage)
    }
})

register("step", (mesa) => {
    new Thread(() => {
        if (timetospam) {
            time = ((timercountdown - Date.now()) / 1000 + 10).toFixed(1)
            allEntity = World.getAllEntities()
            for(let l = 0; l < allEntity.length; l++) {
                if(allEntity[l].toString().includes("Hub Selector") && distanceToPlayer(allEntity[l].getX(), allEntity[l].getY(), allEntity[l].getZ()) < 20) {
                    if (timetospam2) {
                        timetospam2 = false
                        Thread.sleep(delay);   
                        lookAt(allEntity[l].getX()+(Math.random()/10), allEntity[l].getY()+Math.random(), allEntity[l].getZ()+Math.random());
                        WalkForward.setState(true)
                        Sprint.setState(true)
                        ChatLib.say(publicmessage)
                    } 
                    if (time <= 2) {
                        if (Client.currentGui.get() == null) {
                            let inv = Player.getOpenedInventory()
                            inv.click(10, false, "LEFT"); 
                        }
                    }
                    if (time <= 0) {
                        ChatLib.chat(prefix + " &cFailsafe activating")
                        timercountdown = Date.now()+1
                        ChatLib.say("/warp dhub")
                    }
                }
            }
        }
    }).start()
}).setFps(1)

register("chat", (players) => {
    if (timetospam) {
    new Thread(() => {
        Thread.sleep(delay*2)
        ChatLib.say("/play sb")
    }).start();
}
}).setChatCriteria("disconnect.spam")

register("chat", (players) => {
    if (timetospam) {
        if (sayed) return; // grammar
        new Thread(() => {
            Thread.sleep(delay)
            ChatLib.say(publicmessage + " /////////////////////")
            sayed = true
        }).start();
    }
}).setChatCriteria("You cannot say the same message twice!")

register("chat", (mesa) => {
    let mes = ChatLib.getChatMessage(mesa);
    if (mes.includes("Warping") || mes.includes("Sending")) {
        timetospam2 = true
        timercountdown = Date.now()
    }
});

register("chat", (startofmessage, player, restofmessage) => {
    ChatLib.say("/p join " + stripRank(player))
}).setChatCriteria("-${startofmessage}-${player} has ${restofmessage}")

register("chat", (players) => {
    new Thread(() => {
        Thread.sleep(delay)
        ChatLib.say("/pc " + partymessage)
        Thread.sleep(delay)
        ChatLib.say("/p leave")
    }).start();
}).setChatCriteria("You have joined ${players} party!")

register("tick", () => {
    new Thread(() => {
        if (timetospam) {
            if (Client.currentGui.get() == null) {
            allEntity = World.getAllEntities()
            for(let l = 0; l < allEntity.length; l++) {
                if(allEntity[l].toString().includes("Hub Selector")) {
                    if(distanceToPlayer(allEntity[l].getX(), allEntity[l].getY(), allEntity[l].getZ()) < 1.5) {
                        lookAt(allEntity[l].getX(), allEntity[l].getY(), allEntity[l].getZ())
                        WalkForward.setState(false)
                        RightClick.invoke(mc)
                    }
                    }
                }
            }
            else {
                let inv = Player.getOpenedInventory()
                for (let i = 0; i < 54; i++) {
                    if (inv.getName().includes("Hub")) {
                        let item = inv.getStackInSlot(i);
                        if (item.getDamage() == 14 || item.getStackSize() == 28) {
                            if (item.getStackSize() == 7 || item.getStackSize() == 14 || item.getStackSize() == 21) {
                                i = i+2
                            }
                            if (item.getStackSize() == 28) {
                                inv.click(10, false, "LEFT");
                            }
                            else {
                                i = i+1
                            }
                            inv.click(i, false, "LEFT");
                            sayed = false
                        }
                    }
                }
            }    
        }
    }).start()
});