import { Component } from '@angular/core';
import { Produit } from '../model/protuit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent {
  produits: Array<Produit> = [
    { id: 1, code: 'x12', designation: 'Panier plastique', prix: 20 },
    { id: 2, code: 'y4', designation: 'table en bois', prix: 100 },
    { id: 3, code: 'y10', designation: 'salon en cuir', prix: 3000 },
  ];
  produitCourant = new Produit();
  existeDeja(id: number): boolean {
    return this.produits.some((produit) => produit.id === id);
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    const id = form.value.id;

    if (id != undefined && this.existeDeja(id)) {
      const produitAMettreAJour = this.produits.find(
        (produit) => produit.id === id
      );
      if (produitAMettreAJour != undefined) {
        const confirmation = confirm(
          'Voulez-vous vraiment mettre à jour le produit ' +
            produitAMettreAJour.designation +
            ' ?'
        );
        if (confirmation) {
          // Mettre à jour le produit
          this.produits[this.produits.indexOf(produitAMettreAJour)] =
            form.value;
            this.produitCourant=new Produit();
        }
      }
    } else {
      // Ajout du produit au tableau si l'ID est unique
      this.produits.push(form.value);
    }
  }

  modifierProduit(p: Produit) {
    const produitAEditer = this.produits.find(produit => produit.id === p.id);

    // Si le produit est trouvé, associer ses attributs aux champs du formulaire
    if (produitAEditer != undefined) {
      this.produitCourant = produitAEditer;
    }
  }
  supprimerProduit(p: Produit) {
    //Afficher une boite de dialogue pour confirmer la suppression
    let reponse: boolean = confirm(
      'Voulez vous supprimer le produit :' + p.designation + ' ?'
    );
    if (reponse == true) {
      console.log('Suppression confirmée...');
      //chercher l'indice du produit à supprimer
      let index: number = this.produits.indexOf(p);
      console.log('indice du produit à supprimer: ' + index);
      if (index !== -1) {
        // supprimer le produit référencé
        this.produits.splice(index, 1);
      }
    } else {
      console.log('Suppression annulée...');
    }
  }
}
