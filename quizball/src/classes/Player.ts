export class Player {
  name: string;
  score: number;
  bonus: string[];

  constructor(name: string) {
    this.name = name;
    this.score = 0;
    this.bonus = new Array("x2", "50-50");
  }

  printData() {
    console.log(`Player Name : ${this.name}`);
  }

  setName(name: string) {
    this.name = name;
  }

  setBonuses(bonus: string[]) {
    this.bonus = bonus;
  }

  setScore(points: number) {
    this.score = this.score + points;
  }
}
