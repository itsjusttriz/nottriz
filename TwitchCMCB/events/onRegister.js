import chalk from 'chalk';
import { ChannelManager } from '../utils/ChannelManager.js';
import { DeathsManager } from '../utils/DeathsManager.js';
import { MoSManager } from "../utils/MoSManager.js";
import { ToolsManager } from "../utils/ToolsManager.js";
import { CooldownManager } from '../utils/CooldownManager.js';
import { TimerManager, TimerRunner } from '../utils/TimerManager.js';
import { default as tokenData } from "../tokens.json";

export default async function (chatClient, apiClient) {
    console.log(chalk.cyan.bold(`===> ${chalk.green.bold('READY!')} <===`));

    const nonTurboColors = {
        colorList: ['blue', 'blueviolet', 'cadetblue', 'chocolate', 'coral', 'dodgerblue', 'firebrick', 'goldenrod', 'green', 'hotpink', 'orangered', 'red', 'seagreen', 'springgreen', 'yellowgreen'],
        random() {
            return this.colorList[Math.floor((Math.random() * this.colorList.length))];
        }
    }

    setInterval(function () {
        chatClient.changeColor(nonTurboColors.random());
    }, 1000 * 2);

    ChannelManager.import(chatClient);
    DeathsManager.import();
    MoSManager.import();
    ToolsManager.import();
    CooldownManager.import();
    TimerManager.import();

    for (let x in TimerRunner) {
        for (let y in TimerRunner[x]) {
            TimerRunner[x][y](chatClient, apiClient);
        }
    }

    const streamInfo = await apiClient.helix.streams.getStreamByUserName('itsjusttriz');

    setInterval(async () => {
        if (streamInfo) {
            console.log('Triz Live!');
        }
    }, 1000 * 1);
    console.log(tokenData)
}