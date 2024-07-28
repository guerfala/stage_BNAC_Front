import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  generatePdf(data: any[], fileName: string): void {
    const doc = new jsPDF();

    // Customize table appearance
    const styles = {
      fontSize: 12,
      fontStyle: 'normal', // 'bold' | 'italic'
      overflow: 'linebreak',
      halign: 'left' // 'center' | 'right'
    };

    // Table headers and rows
    const headers = [['Matricule', 'Nom et Prenom', 'Identifiant', 'Libelle Court', 'Solde', 'Code Nature Compte Titre', 'Code Categorie Avoir', 'Adresse']];
    const rows = data.map(row => [row.matricule, row.raisonSociale, row.identifiant, row.libelleCourt, row.solde, row.codeNatureCompteTitre, row.codeCategorieAvoir, row.adresse]);

    // Add a title to the PDF document
    doc.text('Table Data Exported as PDF', 15, 15);

    // Set margin top
    (doc as any).autoTable({
      head: headers,
      body: rows,
      startY: 20, // Start y position of the table
      styles: styles,
      columnStyles: {
        0: { fontStyle: 'bold' }, // Make the first column bold
        2: { columnWidth: 'auto' }, // Adjust column width for better fit (default is 'auto')
        7: { overflow: 'ellipsize' } // Example of ellipsize for long content
      },
      margin: { top: 25 } // Set margin top of the table
    });

    // Save the PDF with a specified name
    doc.save(`${fileName}.pdf`);
  }
}