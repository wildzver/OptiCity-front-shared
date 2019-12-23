export class Origin {

  public id?: number;
  public name?: string;
  public uaName?: string;
  public checked?: boolean;
  public enableOption?: boolean;

  constructor(id?: number,
              name?: string,
              uaName?: string,
              checked?: boolean,
              enableOption?: boolean) {
    this.id = id;
    this.name = name;
    this.uaName = uaName;
    this.checked = checked;
    this.enableOption = enableOption;
  }
}
