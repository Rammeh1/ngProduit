import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-gestion-produits';
  actions: Array<any> = [
    { titre: 'accueil', route: '/accueil' },
    { titre: 'produits', route: '/produits' },
    { titre: 'ajouterProduits', route: '/ajouterProduits' },
    { titre: 'About', route: '/about' },
  ];
  actionCourante: any;
  setActionCourante(a: any) {
    this.actionCourante = a;
  }
}
