export class Color {

  public id?: number;
  public name?: string;
  public uaName?: string;
  public imageName?: string;
  public checked?: boolean;
  public enableOption?: boolean;

  constructor(id?: number,
              name?: string,
              uaName?: string,
              imageName?: string,
              checked?: boolean,
              enableOption?: boolean) {
    this.id = id;
    this.name = name;
    this.uaName = uaName;
    this.imageName = imageName;
    this.checked = checked;
    this.enableOption = enableOption;
  }
}
