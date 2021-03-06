export const getGrid = (type) => {
  let grid;

  if (type === "col-win") {
    grid = [
      ['001', '012', '022', '032', '042', '052’, ’062'],
      ['101', '110', '122', '131', '142', '152', '162'],
      ['201', '210', '222', '231', '242', '252', '262'],
      ['301', '312', '322', '332', '340', '352', '362'],
      ['402', '412', '422', '432', '442', '452', '462'],
      ['500', '512', '521', '532', '542', '552', '562'],
      ['602', '612', '622', '632', '642', '652', '662']
    ];
    return grid;
  }

  if (type === "row-win") {
    grid = [
      ['002', '012', '022', '032', '042', '052’, ’062'],
      ['102', '110', '120', '130', '140', '152', '162'],
      ['201', '212', '222', '232', '242', '251', '262'],
      ['302', '311', '322', '332', '342', '352', '362'],
      ['402', '412', '422', '431', '442', '451', '462'],
      ['502', '512', '521', '532', '542', '552', '562'],
      ['602', '612', '622', '632', '642', '652', '662']
    ];
    return grid;
  }

  if (type === "diag-win") {
    grid = [
      ['002', '012', '022', '032', '042', '052’, ’062'],
      ['102', '110', '120', '130', '140', '152', '162'],
      ['201', '212', '222', '232', '242', '251', '262'],
      ['301', '311', '322', '332', '342', '352', '362'],
      ['402', '411', '422', '431', '442', '451', '462'],
      ['502', '512', '521', '532', '542', '552', '562'],
      ['602', '612', '622', '631', '642', '652', '662']
    ];
    return grid;
  }

  grid = [
    ['001', '011', '020', '030', '042', '052’, ’062'],
    ['101', '112', '122', '132', '142', '152', '162'],
    ['202', '212', '222', '232', '242', '250', '262'],
    ['302', '312', '322', '330', '342', '352', '362'],
    ['400', '412', '422', '432', '440', '450', '462'],
    ['502', '512', '521', '532', '542', '552', '562'],
    ['602', '612', '622', '632', '642', '652', '662']
  ];
  return grid
}

export const getMaxArr = (type) => {
  let arr;

  // if (type === 'win') {
  //   TODO: add winning grid
  // }
    arr = [
      [ '001', '011', '020', '030', '042', '052’, ’062' ],
      [ '101', '112', '122', '132', '142', '152' ],
      [ '202', '212', '222', '232', '242', '250' ],
      [ '302', '312', '322', '330', '342', '352' ],
      [ '400', '412', '422', '432', '440', '450' ],
      [ '502', '512', '521', '532', '542', '552' ],
      [ '602', '612', '622', '632', '642', '652' ],
      [
        '001', '101',
        '202', '302',
        '400', '502',
        '602'
      ],
      [
        '011', '112',
        '212', '312',
        '412', '512',
        '612'
      ],
      [
        '020', '122',
        '222', '322',
        '422', '521',
        '622'
      ],
      [
        '030', '132',
        '232', '330',
        '432', '532',
        '632'
      ],
      [
        '042', '142',
        '242', '342',
        '440', '542',
        '642'
      ],
      [ '052’, ’062', '152', '250', '352', '450', '552', '652' ],
      [],
      [ '602' ],
      [ '502', '612' ],
      [ '400', '512', '622' ],
      [ '302', '412', '521', '632' ],
      [ '202', '312', '422', '532', '642' ],
      [ '101', '212', '322', '432', '542', '652' ],
      [ '001', '112', '222', '330', '440', '552' ],
      [ '011', '122', '232', '342', '450' ],
      [ '020', '132', '242', '352' ],
      [ '030', '142', '250' ],
      [ '042', '152' ],
      [ '052’, ’062' ],
      [ '001' ],
      [ '101', '011' ],
      [ '202', '112', '020' ],
      [ '302', '212', '122', '030' ],
      [ '400', '312', '222', '132', '042' ],
      [ '502', '412', '322', '232', '142', '052’, ’062' ],
      [ '602', '512', '422', '330', '242', '152' ],
      [ '612', '521', '432', '342', '250' ],
      [ '622', '532', '440', '352' ],
      [ '632', '542', '450' ],
      [ '642', '552' ],
      [ '652' ],
      []
    ];

  return arr;
}
