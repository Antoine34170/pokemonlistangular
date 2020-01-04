export class Hero {
    id: number;
    name: string;
    skill: number;
    picture: string;
    types: Array<string>;

    constructor(id, name, skill, picture, types) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.picture = picture;
        this.types = types;
    }
    public getCssClasses() {
    
        const firstType = this.types[0];
        const secondType = this.types[1];
        return [this.typeToColor(firstType), (this.types.length == 1) ? '#FFF' : this.typeToColor(secondType)];
      }
    
      
      
      typeToColor(type) {
        let color;
        switch (type) {
          case 'Dragon':
            color = '#ff7e33';
            break;
          case 'Plante':
            color = '#45ca2d';
            break;
          case 'Poison':
            color = '#702dca';
            break;
          case 'Insecte':
            color = '#2fca2d';
            break;
          case 'Electrique':
            color = '#ded70b';
            break;
          case 'Feu':
            color = '#ac1010';
            break;
          case 'Normal':
            color = '#e7e3d2';
            break;
          case 'Combat':
            color = '#dfd4a2';
            break;
          case 'Eau':
            color = '#33ffe6';
            break;
          case 'Roche':
            color = '#56523e';
            break;
          case 'Terre':
            color = '#7c693f';
            break;
          default:
            color = '#ffff';
            break;
        }
        return color;
      }
    


}

  
    