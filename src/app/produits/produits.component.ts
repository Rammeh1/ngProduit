import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/protuit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Array<Produit> = [];
  produitCourant = new Produit();
  private baseUrl ='http://localhost:9999/produits/';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    console.log('Initialisation du composant: Récupérer la liste des produits');
    this.http.get<Array<Produit>>('http://localhost:9999/produits').subscribe({
      next: (data) => {
        console.log('Succès GET');
        this.produits = data;
      },
      error: (err) => {
        console.log('Erreur GET');
      },
    });
  }
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
          const p = form.value;
          console.log('update de produit');
          const url = `http://localhost:9999/produits/${p.id}`;
          this.http.put<Produit>(url, p).subscribe({
            next: (data) => {
              console.log('Succès Update');
              this.produits[this.produits.indexOf(produitAMettreAJour)] = p;
              this.produitCourant = new Produit();
            },
            error: (err) => {
              console.log('Erreur Update produit');
            },
          });
        }
      }
    } else {
      // Ajout du produit au tableau si l'ID est unique
      const p = form.value;
      console.log('Ajout de produit');
      this.http.post<Produit>('http://localhost:9999/produits', p).subscribe({
        next: (data) => {
          console.log('Succès Post');
          this.produits.push(p);
        },
        error: (err) => {
          console.log('Erreur Creation produit');
        },
      });
    }
  }

  modifierProduit(p: Produit) {
    const produitAEditer = this.produits.find((produit) => produit.id === p.id);
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
        console.log('suppresion de produit');
        this.http.delete(this.baseUrl+p.id).subscribe({
          next: (data) => {
            console.log('Succès Delete');
            this.produits.splice(index, 1);
          },
          error: (err) => {
            console.log('Erreur suppression produit');
          },
        });
      }
    } else {
      console.log('Suppression annulée...');
    }
  }
}
