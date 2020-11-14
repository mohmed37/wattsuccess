export class Questionnaire4Model {

  public id:number;
  public metier:string;
  public lettres:string[];

 constructor(id:number, lettres:string[]) {
    this.lettres=lettres;this.id=id;
  }

}
