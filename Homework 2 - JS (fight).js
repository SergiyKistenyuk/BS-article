/**
 * bsa - Homework 2 - Fight
 */

'use strict';

class Fighter {

    // якщо значення power або health не будуть задані, тоді вони рівні = 1
    constructor(name = 'noname', power = 1, health = 1) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    setDamage(damage) {
        if (damage > this.health) {
            // damage не може бути більше ніж health, тому в такому разі прирівнюємо damage до health
            this.health = 0;
        } else {
            this.health -= damage;
        }
        console.log(`${this.name} health:  ${this.health}`);
    }

    // якщо в масиві point не буде значень, тоді point = 1
    hit(enemy, point = 1) {
        enemy.setDamage(point * this.power);
    }

    isAlive() {
        return this.health > 0;
    }
}

class ImprovedFighter extends Fighter {

    doubleHit(enemy, point = 1) {
        super.hit(enemy, point * 2);
    }
}

let fighter = new Fighter('Superman', 10, 200);
let improvedFighter = new ImprovedFighter('Batman', 10, 200);

// додано параметр deathFight, який визначає чи має тривати бій до смерті одного гравця чи просто до закінчення значень в масиві point
let fight = (fighter, improvedFighter, deathFight,  ...point) => {

    // по рандому визначаємо хто б`є перший
    let whoseHit = Math.round(Math.random());
    let i = 0;

    while (fighter.isAlive() && improvedFighter.isAlive()) {

        if (whoseHit) {
            fighter.hit(improvedFighter, point[i]);
        } else {
            // по рандому визначаємо чи наносить improvedFighter подвійний удар чи простий
            if (Math.round(Math.random())) {
                improvedFighter.doubleHit(fighter, point[i]);
            } else {
                improvedFighter.hit(fighter, point[i]);
            }
        }
        console.log(point[i]);
        whoseHit = !whoseHit;

        // якщо бій має тривати до смерті одного гравця і значень point буде замало, беремо значення з початку масиву point, тобто зациклюємо масив point
        i++;
        if (deathFight && i == point.length ) {
            i = 0;
        }

        if (!deathFight && i == point.length ) {
            break;
        }
    }

    if (fighter.health == improvedFighter.health) {
        console.log(`Бій закінчився нічийним результатом. ${fighter.name} health : ${fighter.health},  ${improvedFighter.name} health : ${improvedFighter.health}`);
    }
    if (fighter.health < improvedFighter.health) {
        console.log(`Бій виграв ${improvedFighter.name}.  ${fighter.name} health : ${fighter.health},  ${improvedFighter.name} health : ${improvedFighter.health}`);
    }
    if (fighter.health > improvedFighter.health) {
        console.log(`Бій виграв ${fighter.name}.  ${fighter.name} health : ${fighter.health},  ${improvedFighter.name} health : ${improvedFighter.health}`);
    }
}

fight(fighter, improvedFighter, true, 3, 4, 5, 2);
