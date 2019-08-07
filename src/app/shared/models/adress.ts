export class Adress {
  public settlement?: string;
  public branch?: string;

  constructor(settlement?: string, branch?: string) {
    this.settlement = settlement;
    this.branch = branch;
  }
}
