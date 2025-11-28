const docDefinition = (fighter: any) => ({
  // --- General Config ---
  pageSize: 'A4',
  pageMargins: [50, 50, 50, 50],
  defaultStyle: { 
    font: 'Roboto', 
    fontSize: 10,
    color: '#333333'
  },

  header: () => ({
    columns: [
      { 
        text: 'WTB', 
        style: 'logoText', 
        alignment: 'left',
        width: 'auto',
        margin: [50, 20, 0, 0]
      },
      {
        text: 'REPORTE DE ATLETA',
        fontSize: 10,
        bold: true,
        color: '#666666',
        alignment: 'right',
        margin: [0, 20, 50, 0]
      }
    ],
  }),
  
  // --- main content ---
  content: [
    {
      columns: [
        {
          text: `${fighter.firstName} ${fighter.lastName}`,
          fontSize: 34,
          bold: true,
          color: '#000000',
          width: 'auto'
        },
        {
          text: `"${fighter.nickname}"`,
          fontSize: 20,
          bold: true,
          color: '#1565C0',
          alignment: 'right',
          margin: [0, 10, 0, 0],
          width: '*'
        }
      ],
      margin: [0, 0, 0, 8]
    },
    
    //blue line
    {
        canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#1565C0' }
        ],
        margin: [0, 5, 0, 20]
    },

    //key values and body data
    {
      columns: [
        {
          width: '35%',
          layout: 'headerLineOnly',
          table: {
            widths: ['*'],
            headerRows: 1,
            body: [
              [{ text: 'DATOS DE CLASIFICACIÓN', style: 'blockHeader' }],
              [{ text: [{ text: 'Clase de Peso\n', style: 'cardLabel' }, { text: fighter.weightClass, style: 'cardValue' }], margin: [0, 5, 0, 5] }],
              [{ text: [{ text: 'Nacionalidad\n', style: 'cardLabel' }, { text: fighter.nationality, style: 'cardValue' }], margin: [0, 5, 0, 5] }],
            ]
          },
          margin: [0, 0, 10, 0]
        },
        
        {
          width: '65%',
          layout: 'headerLineOnly',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: [
              [{ text: 'DATOS FÍSICOS', style: 'blockHeader', colSpan: 2 }, {}],
              [
                { text: [{ text: 'Edad\n', style: 'cardLabel' }, { text: `${fighter.age} años`, style: 'cardValue' }], margin: [0, 5, 0, 5] },
                { text: [{ text: 'Altura (cm)\n', style: 'cardLabel' }, { text: `${fighter.height} cm`, style: 'cardValue' }], margin: [0, 5, 0, 5] }
              ],
              [
                { text: [{ text: 'Alcance (cm)\n', style: 'cardLabel' }, { text: `${fighter.reach} cm`, style: 'cardValue' }], margin: [0, 5, 0, 5] },
                { text: '', border: [false, false, false, false] }
              ],
            ]
          }
        }
      ],
      margin: [0, 0, 0, 30]
    },

    {
      text: 'RÉCORD PROFESIONAL (W-L-D)',
      style: 'sectionHeader',
    },
    {
      columns: [
        // Column 1 Récord W-L
        {
          width: '50%',
          stack: [
            {
              text: `${fighter.wins} - ${fighter.losses}`,
              style: 'recordMainValue',
              margin: [0, 5, 0, 5]
            },
            {
              text: 'VICTORIAS - DERROTAS',
              fontSize: 12,
              bold: true,
              alignment:'left',
              color: '#333333',
              margin: [0, 0, 0, 15]
            },
            {
              text: [
                { text: 'Empates (D):\n', style: 'cardLabel' },
                { text: fighter.draws.toString(), fontSize: 24, bold: true, color: '#666666', alignment:'left' }
              ],
              alignment: 'center'
            }
          ],
          alignment: 'center',
          background: '#EEEEEE',
          padding: [15, 15, 15, 15],
          margin: [0, 10, 5, 0]
        },
        
        //(Victories, Losses, Total)
        {
          width: '50%',
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            fillColor: (i) => (i % 2 === 0) ? '#F5F5F5' : null,
            paddingLeft: () => 8,
            paddingRight: () => 8,
            paddingTop: () => 8,
            paddingBottom: () => 8,
          },
          table: {
            widths: ['60%', '40%'],
            body: [
              [{ text: 'VICTORIAS (W)', style: 'statDetailLabel' }, { text: fighter.wins.toString(), style: 'statDetailValueWins' }],
              [{ text: 'DERROTAS (L)', style: 'statDetailLabel' }, { text: fighter.losses.toString(), style: 'statDetailValueLosses' }],
              [{ text: 'EMPATES (D)', style: 'statDetailLabel' }, { text: fighter.draws.toString(), style: 'statDetailValueDraws' }],
              [{ text: 'TOTAL DE PELEAS', style: 'statDetailLabelTotal' }, { text: (fighter.wins + fighter.losses + fighter.draws).toString(), style: 'statDetailValueTotal' }],
            ]
          },
          margin: [5, 10, 0, 0]
        }
      ]
    }
  ],
  
  // --- ESTILOS DEFINIDOS ---
  styles: {
    logoText: {
        fontSize: 22,
        bold: true,
        color: '#1565C0',
        letterSpacing: 2,
        decoration: 'underline',
        decorationStyle: 'solid',
        decorationColor: '#1565C0',
        decorationThickness: 2,
        margin: [0, 0, 0, -5]
    },
    fighterNameTitle: { 
      alignment: 'left',
    },
    sectionHeader: { 
      fontSize: 12, 
      bold: true, 
      color: '#000000', 
      margin: [0, 10, 0, 5],
      decoration: 'underline',
      decorationColor: '#1565C0'
    },
    blockHeader: {
        fontSize: 10,
        bold: true,
        color: 'white',
        fillColor: '#1565C0',
        alignment: 'center',
        padding: [5, 5, 5, 5]
    },
    cardLabel: { 
      fontSize: 8, 
      bold: false, 
      color: '#AAAAAA' ,
      alignment:'left'
    },
    cardValue: { 
      fontSize: 14, 
      color: '#000000',
      bold: true,
    },
    recordMainValue: {
        fontSize: 50,
        bold: true,
        color: '#1565C0',
        alignment: 'left'
    },
    statDetailLabel: {
        fontSize: 10,
        color: '#555555',
        bold: true
    },
    statDetailValueWins: {
        fontSize: 12, bold: true, color: 'darkgreen', alignment: 'right'
    },
    statDetailValueLosses: {
        fontSize: 12, bold: true, color: '#D84315', alignment: 'right'
    },
    statDetailValueDraws: {
        fontSize: 12, bold: true, color: '#666666', alignment: 'right'
    },
    statDetailLabelTotal: {
        fontSize: 12, bold: true, color: '#000000', margin: [0, 5, 0, 0]
    },
    statDetailValueTotal: {
        fontSize: 14, bold: true, color: '#1565C0', alignment: 'right', margin: [0, 5, 0, 0]
    }
  },

  footer: () => ({
    columns: [
      { text: `Reporte de Base de Datos WTB`, alignment: 'left', fontSize: 9, color: '#AAAAAA' },
    ],
    margin: [50, 0, 50, 0]
  }),
});

export default docDefinition;