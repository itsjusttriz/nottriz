import * as axios from 'axios';
import chalk from 'chalk';
import * as fs from 'fs';
import * as $ from '../datapull/defaults.js';
import { botAdmin } from '../config.js';

const jsonStorageFile = './datapull/JSON-Storage/matrixis.json';
let jsonStorageData;
fs.readFile(jsonStorageFile, (err, data) => {
    //    console.log(JSON.parse(data))
    try {
        jsonStorageData = JSON.parse(data);
        console.log(`=== Syncing ${jsonStorageData.Caster}.json ===\n`, jsonStorageData);
    } catch (e) {
        console.log(chalk.red(e));
    }
});

export async function handleMessage(chatClient, channel, user, message, msg) {

    if (msg.isCheer) {

        chatClient.say(channel, $.createDefaultCheerMessage(msg))
        chatClient.say($.logChannel, $.createCheerEventLogMessage(channel, user, msg))
    }

    if (message.startsWith('!speak')) {
        if ($.isModPlus(msg)) return;
        chatClient.deleteMessage(channel, msg)
        chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
    }

    switch ($.command(message)) {
        case 'n!death':
            let deathCtrTag = '[DeathCounter]';
            if (!$.firstArg(message)) {
                chatClient.say(channel, `Current Deaths: ${jsonStorageData.Deaths}`)
            } else if ($.firstArg(message) === '+') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] += 1;
                chatClient.say(channel, `${deathCtrTag} Increased by 1 to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message) === '-') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] += -1;
                chatClient.say(channel, `${deathCtrTag} Decreased by 1 to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message) === 'set') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] = Number($.args(message)[1]) || 0;
                chatClient.say(channel, `${deathCtrTag} Set to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message) === 'reset') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] = 0;
                chatClient.say(channel, `${deathCtrTag} Reset to ${jsonStorageData.Deaths}.`)
            }
            fs.writeFile(jsonStorageFile, JSON.stringify(jsonStorageData), (err) => {
                if (err) return console.log(err)
            })
            chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
            break;
        case 'n!pickaxe':
            let pickaxeCtrTag = '[PickaxeCounter]';
            if (!$.firstArg(message)) {
                chatClient.say(channel, `Broken Pickaxes: ${jsonStorageData.Pickaxe}`)
            } else if ($.firstArg(message) === '+') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] += 1;
                chatClient.say(channel, `${pickaxeCtrTag} Increased by 1 to ${jsonStorageData.Pickaxe}.`)
            } else if ($.firstArg(message) === '-') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] += -1;
                chatClient.say(channel, `${pickaxeCtrTag} Decreased by 1 to ${jsonStorageData.Pickaxe}.`)
            } else if ($.firstArg(message) === 'set') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] = Number($.args(message)[1]) || 0;
                chatClient.say(channel, `${pickaxeCtrTag} Set to ${jsonStorageData.Pickaxe}.`)
            } else if ($.firstArg(message) === 'reset') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] = 0;
                chatClient.say(channel, `${pickaxeCtrTag} Reset to ${jsonStorageData.Pickaxe}.`)
            }
            fs.writeFile(jsonStorageFile, JSON.stringify(jsonStorageData), (err) => {
                if (err) return console.log(err)
            })
            chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
            break;
    }
}

export async function handleSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createSubEventLogMessage(channel, subInfom))
}

export async function handleResub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createResubEventLogMessage(channel, user, subInfo))
}

export async function handleGiftSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createSubgiftEventLogMessage(channel, user, subInfo))
}

export async function handleRaid(chatClient, channel, user, raidInfo, msg) {

    chatClient.say($.logChannel, $.createRaidEventLogMessage(channel, raidInfo))
} 