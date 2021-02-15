module.exports = async function setWinner(user, target) {
    const isWinner = user._id.toString() === target.toString();

    if (isWinner) {
        user.stats.wins++;
        user.target = null;
        user.party.isStarted = false;
        user.party.winner = user._id;
        await user.party.save();
    }

    return isWinner;
}

