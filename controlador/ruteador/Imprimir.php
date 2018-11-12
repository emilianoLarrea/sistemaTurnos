<?php
//Rutas donde tendremos la libreria y el fichero de idiomas.
require_once('../../js/pdf/tcpdf_min/tcpdf_import.php');
$htmlImprimir = '<table border="1">'.$_POST['html'].'</table>';

//Se crea el documento
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
 
//Se establece el contenido de la cabecera
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Libro de Temas", "Sistema de Administracion de ".$_POST['Formulario']);

//Se establecen las fuentes de la cabecera y del pie de página
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
 
//Se establecen los márgenes
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
 
//Se establece los saltos de página automáticos.
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
 
//Se establece la fuente
$pdf->SetFont('times', 'BI', 10);
 
//Se añade la página
$pdf->AddPage();
 
//Se escribe una línea con el método CELL
$pdf->writeHTML($htmlImprimir, true, false, true, false, '');
 
//Se cierra y se exporta el archivo PDF
$pdf->Output('EjercicioIntegrador.pdf', 'I');