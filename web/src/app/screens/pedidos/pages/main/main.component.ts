import { Component, OnInit } from '@angular/core';
import { SectionCard } from 'src/app/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sections: SectionCard[] = [
    {
      title: "Crear",
      icon: "monetization_on",
      description: "Registra un nuevo pedido",
      action: "Crear"
    },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
