import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import copyToClipboard from 'copy-to-clipboard';
import Papa from 'papaparse';
import { URL } from '../../../redux/common/url';
import moment from 'moment';

const getNestedValue = (obj, path) => {
  const value = path?.split('.') ?.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  return value !== undefined ? value : "--";
};

export const handleCopy = (reportData, columns) => {
  const copyText = reportData?.map(row => [
    row.id, row.source_hydrant_center?.address, row.destination?.address, row.date, row.date,
    row.user?.name, row.user?.mobile, row.vehicle?.registration_number,
    row.total_distance, row?.remark
  ].join('\t')).join('\n');
  copyToClipboard(copyText);
  alert('Data copied to clipboard');
};

// export const handleCopy1 = (reportData, columns) => {
//   const copyText = reportData?.map(row =>
//     columns?.map(col => row[col.key] ?? "").join('\t')
//   ).join('\n');

//   copyToClipboard(copyText);
//   alert('Data copied to clipboard');
// };

export const handleCSV = (reportData, fileNamePrefix) => {
  const csv = Papa.unparse(reportData?.map(row => ({
    "S.NO.": row.id,
    "Job Id": row.id,
    "Pickup location": row.source_hydrant_center?.address,
    "Drop location": row.destination?.address,
    "Pickup Date / time": row.date,
    "End Date / time": row.date,
    "Trip Duration": "",
    "Name": row?.user?.name,
    "Number": row.user?.mobile,
    "Tanker Number": row.vehicle?.registration_number,
    "Distance": row.total_distance,
    "Amount": "",
    "Remarks": row?.remark,

  })));
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const fileName = fileNamePrefix ? `${fileNamePrefix}_${moment().format('DD-MM-YYYY')}.csv` : " data.csv";

  saveAs(blob, fileName);
};

export const handleExcel = (reportData, fileNamePrefix) => {
  const worksheet = XLSX.utils.json_to_sheet(reportData?.map(row => ({
    "S.NO.": row.id,
    "Job Id": row.id,
    "Pickup location": row.source_hydrant_center?.address,
    "Drop location": row.destination?.address,
    "Pickup Date / time": row.date,
    "End Date / time": row.date,
    "Trip Duration": "",
    "Name": row.user?.name,
    "Number": row.user?.mobile,
    "Tanker Number": row.vehicle?.registration_number,
    "Distance": row.total_distance,
    "Amount": "",
    "Remarks": row?.remark,

  })));
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const fileName = fileNamePrefix ? `${fileNamePrefix}_${moment().format('DD-MM-YYYY')}.xlsx` : " data.xlsx";

  saveAs(blob, fileName);
};

export const handlePDF = (reportData, fileNamePrefix) => {
  const doc = new jsPDF();
  const tableColumn = ["S.NO.", "Job Id", "Pickup location", "Drop location", "Pickup Date / time", "End Date / time", "Trip Duration", "Name", "Number", "Tanker Number", "Distance", "Amount", "Remarks"];
  const tableRows = [];

  reportData.forEach((row, index) => {
    const rowData = [
      index + 1, row.id, row.source_hydrant_center?.address, row.destination?.address, row.date, row.date, "",
      row.user?.name, row.user?.mobile, row.vehicle?.registration_number, row.total_distance,
      "", row?.remark,
    ];
    tableRows?.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows
  });
  const fileName = fileNamePrefix ? `${fileNamePrefix}_${moment().format('DD-MM-YYYY')}.pdf` : " data.pdf";

  doc.save(fileName);
};


// NEW 
export const handleCSVNew = (reportData, columns, fileNamePrefix, fromDate, toDate) => {

  const csvData = reportData?.map((row, index) =>
    Object.fromEntries(columns?.map((col) =>
      col.key === "serialNumber"
        ? [col.label, index + 1]
        : col.label === "Pickup Date" || col.label === "End Date"
          ? [col.label, moment(row[col.key]).format("DD-MM-YYYY")]
          : col.label === "Pickup time" || col.label === "End time"
            ? [col.label, moment(row[col.key]).format("hh:mm:ss A")]
            : [col.label, getNestedValue(row, col.key)]
    ))
  );

  const totalTrips = reportData?.reduce(
    (acc, item) => acc + (fileNamePrefix === "Report Revenue Wise"
      ? item?.bookings_count ?? 0
      : item?.amount ?? 0
    ), 0
  );

  // Prepare footer data

  let dateRow = {};
  if (fileNamePrefix === "Report Revenue Wise") {
    dateRow = {
      [columns[0].label]: "Date",
      [columns[1].label]: `${fromDate ? fromDate : "--"} to ${toDate ? toDate : "--"}`,
      [columns[2].label]: `Total ${fileNamePrefix === "Report Revenue Wise" ? "Trip" : "Amount"}`,
      [columns[3].label]: totalTrips
    };
  } else {
    dateRow = {
      [columns[0].label]: "",
      [columns[1].label]: "",
      [columns[2].label]: "",
      [columns[3].label]: "",
      [columns[4].label]: "",
      [columns[5].label]: "",
      [columns[6].label]: "",
      [columns[7].label]: "",
      [columns[8].label]: "Date",
      [columns[9].label]: `${fromDate ? fromDate : "--"} to ${toDate ? toDate : "--"}`,
      [columns[10].label]: "",
      [columns[11].label]: "",
      [columns[12].label]: `Total ${fileNamePrefix === "Report Revenue Wise" ? "Trip" : "Amount"}`,
      [columns[13].label]: totalTrips
    };
  };

  const noteRow = {
    [columns[0].label]: "This is a System Generated Report and does not require any signature or stamp."
  };

  // Append the footer data to the CSV
  csvData?.push({}, {}, dateRow, noteRow);

  const csv = Papa?.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const fileName = fileNamePrefix ? `${fileNamePrefix}_${moment().format('DD-MM-YYYY')}.csv` : " data.csv";

  saveAs(blob, fileName);
};

export const handleExcelNew = (reportData, columns, fileNamePrefix, fromDate, toDate) => {
  const mainData = reportData?.map((row, index) =>
    Object.fromEntries(columns?.map((col) =>
      col.key === "serialNumber"
        ? [col.label, index + 1]
        : col.label === "Pickup Date" || col.label === "End Date"
          ? [col.label, moment(row[col.key]).format("DD-MM-YYYY")]
          : col.label === "Pickup time" || col.label === "End time"
            ? [col.label, moment(row[col.key]).format("hh:mm:ss A")]
            : [col.label, getNestedValue(row, col.key)]
    )
    )
  );

  // Calculate total trips or use the provided total
  const totalTrips = reportData?.reduce(
    (acc, item) =>
      acc +
      (fileNamePrefix === "Report Revenue Wise"
        ? item?.bookings_count ?? 0
        : item?.amount ?? 0),
    0
  );

  let dateRow = {};
  if (fileNamePrefix === "Report Revenue Wise") {
    dateRow = {
      [columns[0].label]: "Date",
      [columns[1].label]: `${fromDate ? fromDate : "--"} to ${toDate ? toDate : "--"}`,
      [columns[2].label]: `Total ${fileNamePrefix === "Report Revenue Wise" ? "Trip" : "Amount"}`,
      [columns[3].label]: totalTrips
    };
  } else {
    dateRow = {
      [columns[0].label]: "",
      [columns[1].label]: "",
      [columns[2].label]: "",
      [columns[3].label]: "",
      [columns[4].label]: "",
      [columns[5].label]: "",
      [columns[6].label]: "",
      [columns[7].label]: "",
      [columns[8].label]: "Date",
      [columns[9].label]: `${fromDate ? fromDate : "--"} to ${toDate ? toDate : "--"}`,
      [columns[10].label]: "",
      [columns[11].label]: "",
      [columns[12].label]: `Total ${fileNamePrefix === "Report Revenue Wise" ? "Trip" : "Amount"}`,
      [columns[13].label]: totalTrips
    };
  };

  const noteRow = {
    [columns[0].label]: "This is a System Generated Report and does not require any signature or stamp."
  };

  const worksheetDataArray = [...mainData, {}, {}, dateRow, noteRow];

  const worksheet = XLSX.utils.json_to_sheet(worksheetDataArray);
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const fileName = fileNamePrefix ? `${fileNamePrefix}_${moment().format('DD-MM-YYYY')}.xlsx` : " data.xlsx";

  saveAs(blob, fileName);
};

export const handlePDFNew = async (reportData, columns, fileNamePrefix, fromDate, toDate) => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a3",
    putOnlyUsedFonts: true,
  });

  // Load Hindi font
  await doc.addFont(
    "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/unhinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf",
    "NotoSansDevanagari",
    "normal"
  );

  // Helper function to detect Hindi text and set the appropriate font
  const containsHindi = (text) => /[\u0900-\u097F]/.test(text);

  // Helper function to get appropriate font for text
  const getFontForText = (text) => (containsHindi(text) ? "NotoSansDevanagari" : "helvetica");

  // Calculate total trips or use the provided total
  const totalTrips = reportData?.reduce(
    (acc, item) =>
      acc + (fileNamePrefix === "Report Revenue Wise" ? item?.bookings_count ?? 0 : item?.amount ?? 0),
    0
  );

  // Create the main table with the report data
  const tableColumn = columns?.map((col) => col.label);
  const tableRows = reportData?.map((row, index) =>
    columns?.map((col) => {
      if (col.key === "serialNumber") return String(index + 1);
      const value =
        col.label === "Pickup Date" || col.label === "End Date"
          ? moment(row[col.key]).format("DD-MM-YYYY")
          : col.label === "Pickup time" || col.label === "End time"
            ? moment(row[col.key]).format("hh:mm:ss A")
            : getNestedValue(row, col.key);
      return String(value || "");
    })
  );

  // Add date and total rows
  const emptyRow = columns?.map(() => "");
  let dateRow = [];
  if (fileNamePrefix === "Report Revenue Wise") {

    dateRow = columns?.map((col, index) => {
      if (index === 0) return "Date";
      if (index === 1) return `${fromDate || "--"} to ${toDate || "--"}`;
      if (index === 2) return `Total ${fileNamePrefix === "Report Revenue Wise" ? "Trip" : "Amount"}`;
      if (index === 3) return String(totalTrips);
      return "";
    });
  } else {
    dateRow = columns?.map((col, index) => {
      if (index === 6) return "Date";
      if (index === 7) return `${fromDate || "--"} to ${toDate || "--"}`;
      if (index === 12) return `Total ${fileNamePrefix === "Report Revenue Wise" ? "Trip" : "Amount"}`;
      if (index === 13) return String(totalTrips);
      return "";
    });
  }

  const noteRow = [
    {
      content: "This is a System Generated Report and does not require any signature or stamp.",
      colSpan: columns.length,
      styles: { halign: "center", fontStyle: "italic", fontSize: 10 }
    }
  ];

  tableRows?.push(emptyRow, emptyRow, dateRow, noteRow);

  // Draw the main content table
  doc.autoTable({
    startY: 40,
    head: [tableColumn],
    body: tableRows,
    styles: {
      fontSize: 10,
      cellPadding: 4,
      halign: 'center',
      valign: 'middle'
    },
    columnStyles: columns?.reduce(
      (acc, _, index) => ({
        ...acc,
        [index]: { cellWidth: "auto", minCellHeight: 20 },
      }),
      {}
    ),
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: 20,
      fontSize: 11,
      font: "helvetica",
      lineWidth: 0.5, // Border width for header
      lineColor: [0, 0, 0], // Border color for header
      halign: 'center', // Center the text
      valign: 'middle', // Vertically align the text
    },
    bodyStyles: {
      lineWidth: 0.5, // Border width for body cells
      lineColor: [0, 0, 0], // Border color for body cells
      halign: 'center',  // Center the text
      valign: 'middle'   // Vertically align the text
    },
    didDrawCell: (data) => {
      if (data.cell.text && data.cell.text.length > 0) {
        const text = Array.isArray(data.cell.text) ? data.cell.text.join("") : data.cell.text;
        const font = getFontForText(text);
        data.cell.styles.font = font;
      }
    },
    willDrawCell: (data) => {
      if (data.cell.text && data.cell.text.length > 0) {
        const text = Array.isArray(data.cell.text) ? data.cell.text.join("") : data.cell.text;
        const font = getFontForText(text);
        doc.setFont(font);
      }
    },
  });

  // Save the PDF
  const fileName = `${fileNamePrefix}_${moment().format("DD-MM-YYYY")}.pdf`;
  doc.save(fileName);
};

