import { MarcasService } from 'src/app/services/marcas/marcas.service';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { Marca, Status } from 'src/app/models/models';
import { Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ModalData {
  marca: Marca
}

@Component({
  selector: 'app-eliminar-marca',
  templateUrl: './eliminar-marca.component.html',
  styleUrls: ['./eliminar-marca.component.scss']
})
export class EliminarMarcaComponent implements OnInit {


  Status = Status
  currentStatus = Status.loaded

  marca = new Marca()

  @Output() marcaEliminada = new EventEmitter()

  constructor(
    private dialog: MatDialogRef<EliminarMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private marcasService: MarcasService
  ) { }

  ngOnInit(): void {
    this.marca = this.modalData.marca
  }

  deletemMarca() {
    this.currentStatus = Status.loading

    this.marcasService.deleteMarca(this.marca.idMarca).subscribe(e => {
      this.currentStatus = Status.success
      this.marcaEliminada.emit()
    })
  }

  close() {
    this.dialog.close()
  }
}
