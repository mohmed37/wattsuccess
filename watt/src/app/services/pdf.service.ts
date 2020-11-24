import { Injectable } from '@angular/core'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "src/app/services/authentication.service";
import {ApiService} from "src/app/services/api.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfMake: any;
  public hostTest: string;
  public cahier5: string = "assets/pdf/cahier5.pdf";
  constructor(private httpClient: HttpClient,private hostTestService:ApiService) {
    this.hostTest=hostTestService.TEST_MICRO_APP;
  }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }
  async generatePdf() {
    await this.loadPdfMaker();
    const def = { content: 'A sample PDF document generated Angular and PDFMake' };
    this.pdfMake.createPdf(def).open();
  }
}
