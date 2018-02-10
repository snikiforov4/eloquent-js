const {VillageState}  = require("./villagestate");

const NUMBER_OF_TESTS = 100;

exports.compareRobots = function (robot1, memory1, robot2, memory2) {
    function countSteps(state, robot, memory) {
        for (let turn = 0; ; turn++) {
            if (state.parcels.length === 0) {
                return turn;
            }
            let action = robot(state, memory);
            state = state.move(action.direction);
            memory = action.memory;
        }
    }

    let turnsSum1 = 0;
    let turnsSum2 = 0;
    for (let task = 0; task < NUMBER_OF_TESTS; task++) {
        let state = VillageState.random();
        turnsSum1 += countSteps(state, robot1, memory1);
        turnsSum2 += countSteps(state, robot2, memory2);
    }
    console.log(`Robot#1 avg turns: ${turnsSum1 / NUMBER_OF_TESTS}`);
    console.log(`Robot#2 avg turns: ${turnsSum2 / NUMBER_OF_TESTS}`);
};
