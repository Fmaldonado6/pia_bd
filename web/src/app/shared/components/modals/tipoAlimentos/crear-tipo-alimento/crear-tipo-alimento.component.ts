import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Status, TipoAlimento } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';

interface FormValues {
  nombre: string
}

@Component({
  selector: 'app-crear-tipo-alimento',
  templateUrl: './crear-tipo-alimento.component.html',
  styleUrls: ['./crear-tipo-alimento.component.scss']
})
export class CrearTipoAlimentoComponent implements OnInit {

  @Output() tipoCreado = new EventEmitter()


  Status = Status
  currentStatus = Status.loaded


  form = new FormGroup({})

  constructor(
    private dialog: MatDialogRef<CrearTipoAlimentoComponent>,
    private tipoAlimentosService: TiposAlimentosService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ])
    })

  }

  submit(values: FormValues) {
    this.currentStatus = Status.loading

    const tipo = new TipoAlimento()
    tipo.nombre = values.nombre
    this.tipoAlimentosService.addTipoAlimento(tipo).subscribe(e => {
      this.tipoCreado.emit()
      this.currentStatus = Status.success
      setTimeout(() => {
        this.close()
      }, 1500);
    })
  }

  close() {
    this.dialog.close()
  }


}
