import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private userservice:UtilisateurService){}


  ngOnInit(): void {
  }



}
