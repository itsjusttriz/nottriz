const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const botAdmin = require('../main.js').botAdmin
const packlist = require('../DataPull/packlist.js');

let cooldown = {};
//let deathctr = {'Deaths': 0};
//let substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};

function isOnCooldown(channel, command) {
    if (cooldown[channel] && cooldown[channel][command] == true) return true;
    else return false;
}

function setCooldown(channel, command, cd = 5) {
    if (!cooldown[channel]) cooldown[channel] = {};
    cooldown[channel][command] = true;
    setTimeout(function unsetCooldown() {
        cooldown[channel][command] = false;
    }, cd * 1000);
}

function handleChat(channel, userstate, message, self) {
	let command = message.split(' ')[0];
	let args = message.split(' ');
	args.shift();

	switch(command) {
        case '?commands':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            if (isOnCooldown(channel, command)) return;
            else {
                setCooldown(channel, command, 10);
                client.say(channel, "Click here for commands, specific to this channel >> https://itsjusttriz.weebly.com/chatbot-" + channel.substr(1));
            }
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
/*		case '?migrate':
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id']) return;
				if (!args[0]) {
					client.say(channel, 'Usage: !migrate <username> (checks for a namechange and immediately transfers points balance to new username)');
					return;
				}
				request('https://twitch-tools.rootonline.de/username_changelogs_search.php?q=' + args[0] + '&format=json', (err, result, body) => {
					if (err) {
						console.log('Error checking name change: ' + err);
						client.say(channel, 'Unable to check name.');
						return;
					} else {
						let js = JSON.parse(body);
						if (js.length == 0) client.say(channel, 'No recent name change.');
						else {
							client.say(channel, '/w Superfragbot !namechange ' + js[0]['username_old'] + ' ' + js[0]['username_new']);
						}
					}
				});
			break;*/
	}
}

function handleSub(channel, username, method, message, userstate) {
    client.say('#nottriz', '[' + channel + '] SUB: ' + username + ' (' + method.plan + ')');
}

function handleResub(channel, username, useless, message, userstate, method) {
    client.say('#nottriz', '[' + channel + '] RESUB: ' + username + ' - ' + userstate['msg-param-cumulative-months'] + 'months (' + method.plan + ')');
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
    client.say('#nottriz', '[' + channel + '] GIFTSUB: ' + gifter + ' -> ' + recipient + ' (' + method.plan + ')');
}

function handleCheer(channel, userstate, message) {
	var username = userstate.username;
	var	bits = userstate.bits;

	client.say(channel, 'PogChamp x' + bits);
    client.say('#nottriz', '[' + channel + '] BITS: ' + username + ' (' + bits + ')');
}

function handleRaid(customraid) {
	client.say(customraid.channel, "Welcome Raiders from " + customraid.raider + "'s channel! <3 GivePLZ");
	client.say(customraid.channel, '!so ' + customraid.raider);
	client.say('#nottriz', '[' + customraid.channel + '] RAID: ' + customraid.raider);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;