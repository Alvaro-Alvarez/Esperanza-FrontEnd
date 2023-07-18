import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { PageTypeEnum } from 'src/app/core/enums/page-type.enum';
import { CarruselService } from 'src/app/modules/shared/services/carrusel.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

export class InternFile{
  title: string;
  fileName: string;
  folder: string;
  path: string;
  type: 'pdf'|'xls';
  constructor(title: string, fileName: string, folder: string, type: 'pdf'|'xls'){
    this.title = title;
    this.fileName = fileName;
    this.folder = folder;
    this.type = type;
    this.path = `assets/documents/${folder}/${fileName}.${type}`;
  }
}

@Component({
  selector: 'app-essays-and-services',
  templateUrl: './essays-and-services.component.html',
  styleUrls: ['./essays-and-services.component.scss']
})
export class EssaysAndServicesComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }

  carouselSlides: any[] = [];
  sendSamplesFiles: InternFile[] = [];
  technicalInformationFiles: InternFile[] = [];
  testListFiles: InternFile[] = [];
  enableCarousel = false;
  mobile = false;

  constructor(
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private carruselService: CarruselService,
    private sanitizer: DomSanitizer
  ) {
    this.checkResolution();
    this.fillFiles();
  }

  ngOnInit(): void {
    this.loadPagesSlides();
  }
  loadPagesSlides(){
    this.spinner.show();
    let obs = [];
    obs.push(this.carruselService.getByPageType(PageTypeEnum.Default));
    forkJoin(obs).subscribe(arrOptions => {
      this.spinner.hide();
      this.carouselSlides.push(...arrOptions[0].slides);
      this.enableCarousel = arrOptions[0].enable;
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
  fillFiles(){
    this.sendSamplesFiles.push(...[
      new InternFile('Control Microbiológico Ambiental en Planta de Incubación', 'Control_Microbiológico_Ambiental_en_Planta_de_Incubación', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras anaplasmosis babesiosis y tripanos en bovinos', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_Anaplasmosis_Babesiosis_y_Tripanos_en_Bovinos', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras carbunclo en bovinos', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_Carbunclo_en_Bovinos', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras de agua microbiológico y químico', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_de_Agua_Microbiológico_y_Químico', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras de granos alimentos y forrajes', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_de_Granos_Alimentos_y_Forrajes', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras de mastitis', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_de_Mastitis', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras de raspaje', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_de_Raspaje', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras de sangre', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_de_Sangre', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras de triquinelosis', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_de_Triquinelosis', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras en sanidad aviar', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_en_Sanidad_Aviar', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras papilomatosis', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_Papilomatosis', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de muestras para el diagnóstico de diarrea neonatal en bovinos', 'Obtención_Acondicionamiento_y_Remisión_de_Muestras_para_el_Diagnóstico_de_Diarrea_Neonatal_en_Bovinos', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de organos PCR Aves', 'Obtención_Acondicionamiento_y_Remisión_de_Organos_PCR_Aves', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Obtención acondicionamiento y remisión de sangre en bovinos interferon gama', 'Obtención_Acondicionamiento_y_Remisión_de_Sangre_en_Bovinos_Interferon_Gama', 'como_obtener_y_enviar_muestras', 'pdf'),
      new InternFile('Protocolo de remisión de muestras', 'Protocolo_de_Remisión_de_Muestras', 'como_obtener_y_enviar_muestras', 'xls'),
    ]);
    this.testListFiles.push(...[
      new InternFile('Listado Análisis', 'Listado-Análisis', 'listado_de_ensayos', 'pdf'),
    ]);
    this.technicalInformationFiles.push(...[
      new InternFile('Anafilaxia sistémica aguda en bovinos', 'Anafilaxia_Sistémica_Aguda_en_Bovinos', 'información_tecnica', 'pdf'),
      new InternFile('Anaplasmosis y babesiosis', 'Anaplasmosis_y_Babesiosis', 'información_tecnica', 'pdf'),
      new InternFile('Diagnóstico difererencial del aborto bovino FCV CV', 'Diagnóstico_Difererencial_del_Aborto_Bovino_FCV_CV', 'información_tecnica', 'pdf'),
      new InternFile('Leucosis bovina enzoótica', 'Leucosis_Bovina_Enzoótica', 'información_tecnica', 'pdf'),
      new InternFile('Papilomatosis caninos protocolo autovacuna', 'Papilomatosis_Caninos_Protocolo_Autovacuna', 'información_tecnica', 'pdf'),
      new InternFile('Paratuberculosis', 'Paratuberculosis', 'información_tecnica', 'pdf'),
      new InternFile('Test de glutaraldehido', 'Test_de_Glutaraldehido', 'información_tecnica', 'pdf'),
      new InternFile('Tratamiento y vacunación en enfermedades anemizantes en bovinos ', 'Tratamiento_y_Vacunación_en_Enfermedades_Anemizantes_en_Bovinos ', 'información_tecnica', 'pdf'),
      new InternFile('Tratamiento y vacunación en enfermedades anemizantes en bovinos', 'Tratamiento_y_Vacunación_en_Enfermedades_Anemizantes_en_Bovinos', 'información_tecnica', 'pdf'),
      new InternFile('Triquinelosis cartilla para productores', 'Triquinelosis_Cartilla_para_Productores', 'información_tecnica', 'pdf'),
      new InternFile('Tuberculina cuadro comparativo', 'Tuberculina_Cuadro_Comparativo', 'información_tecnica', 'pdf'),
    ]);
  }
  openFile(file: InternFile){
    console.log(file);
    debugger
    const link = document.createElement('a');
    link.href = file.path;
    link.download = `${file.fileName}.${file.type}`;
    link.click();
  }
}
