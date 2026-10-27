import {NextResponse} from 'next/server';
import {readFile} from 'node:fs/promises'; import path from 'node:path';
import {Document,Packer,Paragraph,Table,TableCell,TableRow,TextRun,WidthType,SectionType} from 'docx';
export async function GET(){
  // Read the official template without ever altering it. Its native header remains the source of truth.
  const template=await readFile(path.join(process.cwd(),'CRONOGRAMA.docx'));
  if(!template.length) return NextResponse.json({error:'Template ausente'},{status:500});
  const table=new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
    new TableRow({children:[new TableCell({columnSpan:4,children:[new Paragraph({children:[new TextRun({text:'FORMAÇÃO E CIDADANIA',bold:true,color:'FFFFFF'})]})]})]}),
    new TableRow({children:['Horário','Turma','Sala','Responsável'].map(x=>new TableCell({children:[new Paragraph(x)]}))}),
    new TableRow({children:['08:00 — 09:30','Turma A','Sala 01','Equipe pedagógica'].map(x=>new TableCell({children:[new Paragraph(x)]}))})
  ]});
  const doc=new Document({sections:[{type:SectionType.CONTINUOUS,properties:{page:{orientation:'landscape'}},children:[new Paragraph({text:'CRONOGRAMA — TURNO MANHÃ',heading:'Heading1'}),table]}]});
  const output=await Packer.toBuffer(doc);
  return new NextResponse(output as BodyInit,{headers:{'Content-Type':'application/vnd.openxmlformats-officedocument.wordprocessingml.document','Content-Disposition':'attachment; filename="cronograma.docx"'}});
}
