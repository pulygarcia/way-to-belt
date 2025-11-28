import { Injectable } from '@nestjs/common';
import { Fighter } from '../fighters/entities/fighter.entity';
import * as PdfPrinter from 'pdfmake';
import * as path from 'path';
import docDefinition from './fighterDocDefinition';

@Injectable()
export class ReportsService {
  private fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../src/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../src/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../src/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../src/fonts/Roboto-MediumItalic.ttf'),
    },
  };

  private printer = new PdfPrinter(this.fonts);

  async generateFighterPdf(fighter: Fighter): Promise<Buffer> {

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition(fighter));
    const chunks: any[] = [];

    return new Promise((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    });
  }
}

