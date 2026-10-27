import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
const esc=(v:string)=>v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const row=(v:string[],shade?:string)=>`<w:tr>${v.map(x=>`<w:tc>${shade?`<w:tcPr><w:shd w:fill="${shade}"/></w:tcPr>`:''}<w:p><w:r><w:t>${esc(x)}</w:t></w:r></w:p></w:tc>`).join('')}</w:tr>`;
export async function GET(){const data=await readFile(path.join(process.cwd(),'CRONOGRAMA.docx'));const zip=await JSZip.loadAsync(data);const f=zip.file('word/document.xml');if(!f)return NextResponse.json({error:'Documento inválido'},{status:500});let x=await f.async('string');const table=`<w:tbl>${row(['FORMAÇÃO E CIDADANIA','','',''],'404040')}${row(['Horário','Turma','Sala','Responsável'])}${row(['08:00 — 09:30','Turma A','Sala 01','Equipe pedagógica'])}</w:tbl>`;x=x.replace(/<w:sectPr[\s\S]*<\/w:sectPr>/,m=>table+m);x=x.replace(/<w:pgSz([^>]*)>/,(m,a)=>a.includes('w:orient')?m:`<w:pgSz${a} w:orient="landscape"/>`);zip.file('word/document.xml',x);const out=await zip.generateAsync({type:'nodebuffer'});return new NextResponse(out as BodyInit,{headers:{'Content-Type':'application/vnd.openxmlformats-officedocument.wordprocessingml.document','Content-Disposition':'attachment; filename="cronograma.docx"'}})}
