import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';
import { TarjetaService } from './services/tarjeta.service';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FETarjetaCredito';
  
  listtarjetas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _TarjetaService: TarjetaService) {
    
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }
  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._TarjetaService.getListTarjetas().subscribe(data => {
        this.listtarjetas = data;  // Actualiza la lista con los datos de la API
        console.log(data);
    }, error => {
        console.error('Error al obtener tarjetas:', error);
    });
}


guardarTarjeta() {
  const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
  };

  if (this.id == undefined) {
    // Agregamos una tarjeta
    this._TarjetaService.saveTarjeta(tarjeta).subscribe(data => {
      this.toastr.success('Registro Exitoso', 'Tarjeta Registrada');
      this.form.reset();
      this.obtenerTarjetas();  // Aquí refrescamos la lista de tarjetas
    }, error => {
      this.toastr.error('Opsss... ocurrió un error', 'Error');
      console.log(error);
    });
  } else {
    tarjeta.id = this.id;
    // Editamos una tarjeta
    this._TarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
      this.form.reset();
      this.accion = 'Agregar';
      this.id = undefined;
      this.toastr.info('La tarjeta fue actualizada con éxito', 'Tarjeta Actualizada');
      this.obtenerTarjetas();  // También refrescamos al actualizar
    }, error => {
      console.log(error);
    });
  }
}


  eliminarTarjeta(id: number){
    this._TarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La tarjeta fue eliminada con exito','Tarjeta Eliminada')
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    } )
    
  } 
  editarTarjeta(tarjeta:any){
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv

    })
  }  
}