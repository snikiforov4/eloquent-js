const WOBBLE_SPEED = 8, WOBBLE_DIST = 0.07;
const PLAYER_X_SPEED = 7;
const GRAVITY = 30;
const JUMP_SPEED = 17;
const SCALE = 20;
const INIT_LIVES = 3;

const simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;


let Vec = class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
};

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
        actor1.pos.x < actor2.pos.x + actor2.size.x &&
        actor1.pos.y + actor1.size.y > actor2.pos.y &&
        actor1.pos.y < actor2.pos.y + actor2.size.y;
}

let Level = class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type === "string") return type;
                this.startActors.push(
                    type.create(new Vec(x, y), ch));
                return "empty";
            });
        });
    }

    touches(pos, size, type) {
        let xStart = Math.floor(pos.x);
        let xEnd = Math.ceil(pos.x + size.x);
        let yStart = Math.floor(pos.y);
        let yEnd = Math.ceil(pos.y + size.y);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                let isOutside = x < 0 || x >= this.width ||
                    y < 0 || y >= this.height;
                let here = isOutside ? "wall" : this.rows[y][x];
                if (here === type) return true;
            }
        }
        return false;
    }
};


let State = class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        return this.actors.find(a => a.type === "player");
    }

    update(time, keys) {
        let actors = this.actors
            .map(actor => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status);

        if (newState.status !== "playing") return newState;

        let player = newState.player;
        if (this.level.touches(player.pos, player.size, "lava")) {
            return new State(this.level, actors, "lost");
        }

        for (let actor of actors) {
            if (actor !== player && overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }
        return newState;
    }
};


let Player = class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() {
        return "player";
    }

    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)),
            new Vec(0, 0));
    }

    update(time, state, keys) {
        let xSpeed = 0;
        if (keys.ArrowLeft) xSpeed -= PLAYER_X_SPEED;
        if (keys.ArrowRight) xSpeed += PLAYER_X_SPEED;
        let pos = this.pos;
        let movedX = pos.plus(new Vec(xSpeed * time, 0));
        if (!state.level.touches(movedX, this.size, "wall")) {
            pos = movedX;
        }

        let ySpeed = this.speed.y + time * GRAVITY;
        let movedY = pos.plus(new Vec(0, ySpeed * time));
        if (!state.level.touches(movedY, this.size, "wall")) {
            pos = movedY;
        } else if (keys.ArrowUp && ySpeed > 0) {
            ySpeed = -JUMP_SPEED;
        } else {
            ySpeed = 0;
        }
        return new Player(pos, new Vec(xSpeed, ySpeed));
    }
};
Player.prototype.size = new Vec(0.8, 1.5);


let Lava = class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() {
        return "lava";
    }

    static create(pos, ch) {
        if (ch === "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if (ch === "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch === "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }

    collide(state) {
        return new State(state.level, state.actors, "lost");
    }

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Lava(newPos, this.speed, this.reset);
        } else if (this.reset) {
            return new Lava(this.reset, this.speed, this.reset);
        } else {
            return new Lava(this.pos, this.speed.times(-1));
        }
    }
};
Lava.prototype.size = new Vec(1, 1);


let Coin = class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() {
        return "coin";
    }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos,
            Math.random() * Math.PI * 2);
    }

    collide(state) {
        let filtered = state.actors.filter(a => a !== this);
        let status = state.status;
        if (!filtered.some(a => a.type === "coin")) status = "won";
        return new State(state.level, filtered, status);
    }

    update(time) {
        let wobble = this.wobble + time * WOBBLE_SPEED;
        let wobblePos = Math.sin(wobble) * WOBBLE_DIST;
        return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
            this.basePos, wobble);
    }
};
Coin.prototype.size = new Vec(0.6, 0.6);


let Monster = class Monster {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() { return "monster"; }

    static create(pos) {
        return new Monster(pos.plus(new Vec(0, -1)), new Vec(2.5, 0));
    }

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Monster(newPos, this.speed);
        } else {
            return new Monster(this.pos, this.speed.times(-1));
        }
    }

    collide(state) {
        function jumpedOn(player, monster) {
            console.log(`playerSpeed=${player.speed.y}`);
            return player.pos.y < monster.pos.y
                && player.speed.y > 0;
        }
        let actors = state.actors;
        let status = state.status;
        if (jumpedOn(state.player, this)) {
            actors = state.actors.filter(a => a !== this);
        } else {
            status = "lost";
        }
        return new State(state.level, actors, status);
    }
};
Monster.prototype.size = new Vec(1.2, 2);


let levelChars = {
    ".": "empty", "#": "wall", "+": "lava",
    "@": Player, "o": Coin,
    "=": Lava, "|": Lava, "v": Lava,
    "M": Monster
};

let simpleLevel = new Level(simpleLevelPlan);

function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

let DOMDisplay = class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", {class: "game"}, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() { this.dom.remove(); }
};

function drawGrid(level) {
  return elt("table", {
    class: "background",
    style: `width: ${level.width * SCALE}px`
  }, ...level.rows.map(row =>
    elt("tr", {style: `height: ${SCALE}px`},
        ...row.map(type => elt("td", {class: type})))
  ));
}

function drawActors(actors) {
  return elt("div", {}, ...actors.map(actor => {
    let rect = elt("div", {class: `actor ${actor.type}`});
    rect.style.width = `${actor.size.x * SCALE}px`;
    rect.style.height = `${actor.size.y * SCALE}px`;
    rect.style.left = `${actor.pos.x * SCALE}px`;
    rect.style.top = `${actor.pos.y * SCALE}px`;
    return rect;
  }));
}

DOMDisplay.prototype.setState = function(state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft, right = left + width;
  let top = this.dom.scrollTop, bottom = top + height;

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5))
                         .times(SCALE);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

function trackKeys(keys) {
    let down = Object.create(null);

    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type === "keydown";
            event.preventDefault();
        }
    }

    down.register = function () {
        window.addEventListener("keydown", track);
        window.addEventListener("keyup", track);
    };
    down.unregister = function () {
        window.removeEventListener("keydown", track);
        window.removeEventListener("keyup", track);
    };
    return down;
}

let trackedKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "Escape"]);

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let paused = false;
    trackedKeys.register();
    return new Promise(resolve => {
        runAnimation(time => {
            if (trackedKeys.Escape) {
                trackedKeys.Escape = false;
                paused = !paused;
                console.log(`Game has been ${paused ? "" : "un"}paused`);
            }
            if (paused) return true;
            state = state.update(time, trackedKeys);
            display.setState(state);
            if (state.status === "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                trackedKeys.unregister();
                resolve(state.status);
                return false;
            }
        });
    });
}

async function runGame(plans, Display) {
    let lives = INIT_LIVES;
    for (let level = 0; level < plans.length && lives > 0;) {
        console.log(`Level ${level + 1}, Lives: ${lives}`);
        let status = await runLevel(new Level(plans[level]), Display);
        if (status === "won") {
            level++;
        } else {
            lives--;
        }
    }
    if (lives > 0) {
        console.log("You've won!");
    } else {
        console.log("GAME OVER!1!!");
    }
}
