const setWinner = require("./setWinner");

module.exports = async function setTargets(user, target) {
    await user.execPopulate("party");
    await user.party.execPopulate("players");

    switch (user.party.gameMode) {
        case "Classic":
            if (!setWinner(user, target)) {
                user.target = target;
            }
            break;
        case "Shuffle":
            const alivePlayers = user.party.players.filter(player => player.isAlive);
            const players = shuffle(alivePlayers.filter(player => player !== user));
            players.forEach((player, i) => {
                if (i === players.length - 1) {
                    player.target = players[0]._id;
                } else {
                    player.target = players[i + 1]._id;
                }
                player.save();
            });
            setWinner(user, target);
            break;
    }

    await user.save();
}