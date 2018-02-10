const {roadGraph} = require("./roadgraph");

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length === 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at === place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length === 0) {
        let parcel = parcels[0];
        if (parcel.place !== place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

function efficientRobot({place, parcels}, route) {
    if (route.length === 0) {
        route = parcels
            .map(parcel => findRoute(roadGraph, place, parcel.place !== place ? parcel.place : parcel.address))
            .filter(route => route.length > 0)
            .reduce((p, c) => p.length > c.length ? c : p);
    }
    return {direction: route[0], memory: route.slice(1)};
}


exports.randomRobot = randomRobot;
exports.routeRobot = routeRobot;
exports.goalOrientedRobot = goalOrientedRobot;
exports.efficientRobot = efficientRobot;