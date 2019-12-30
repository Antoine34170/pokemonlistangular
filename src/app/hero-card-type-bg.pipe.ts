import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroCardTypeBg'
})
export class HeroCardTypeBgPipe implements PipeTransform {

  transform(types:string): string {
   
    let color: string;
   
    switch (types) {
      case 'Feu':
        color = '#f5120b';
        break;
      case 'Eau':
        color = '#f5120b';
        break;
      case 'Plante':
        color = 'Plante';
        break;
      case 'Roche':
        color = 'Roche';
        break;
      case 'Combat':
        color = 'Combat';
        break;
      case 'Normal':
        color = 'Normal';
        break;
      case 'Dragon':
        color = '#f4681e';
        break;
      case 'Vol':
       color = 'Vol';
       break;
      case 'Terre':
       color = 'Terre';
       break;
       case 'Poison':
       color = 'Poison';
       break;
       case 'Fée':
       color = 'Fée';
       break;
      
      
      default:
        color = '';
        break;
      }
    
      return color;
  
  
  }
  }