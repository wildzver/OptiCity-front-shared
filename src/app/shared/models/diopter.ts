export class Diopter {

  public id?: number;
  public value?: string;
  public checked?: boolean;
  public enableOption?: boolean;

  constructor(id?: number,
              value?: string,
              checked?: boolean,
              enableOption?: boolean) {
    this.id = id;
    this.value = value;
    this.checked = checked;
    this.enableOption = enableOption;
  }
}
