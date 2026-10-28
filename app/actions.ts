'use server';
import { prisma } from '../lib/prisma';
import { findConflicts } from '../lib/conflict-checker';

const n=(v:FormDataEntryValue|null)=>Number(v||0);
export async function createUnidade(f:FormData):Promise<void>{await prisma.unidadeSocioeducativa.create({data:{nome:String(f.get('nome')),sigla:String(f.get('sigla')).toUpperCase()}})}
export async function createTurno(f:FormData):Promise<void>{await prisma.cronogramaTurno.create({data:{nome:String(f.get('nome')),unidadeId:String(f.get('unidadeId'))}})}
export async function createArea(f:FormData):Promise<void>{const t=await prisma.cronogramaTurno.findFirst({where:{id:String(f.get('turnoId')),unidadeId:String(f.get('unidadeId'))}});if(!t)throw new Error('Turno não pertence à unidade');await prisma.areaAtividade.create({data:{nome:String(f.get('nome')),turnoId:t.id}})}
export async function createTurma(f:FormData):Promise<void>{
 const areaId=String(f.get('areaId')); const horaInicio=n(f.get('horaInicio')), horaFim=n(f.get('horaFim'));
 const unidadeId=String(f.get('unidadeId')); const area=await prisma.areaAtividade.findFirst({where:{id:areaId,turno:{unidadeId}},include:{turno:true,colunas:true}}); if(!area) throw new Error('Área não pertence à unidade');
 const conflitos=findConflicts(area.colunas.map(x=>({horaInicio:x.horaInicio,horaFim:x.horaFim,sala:x.sala,professor:x.professor})).concat([{horaInicio,horaFim,sala:String(f.get('sala')),professor:String(f.get('professor'))}]));
 if(conflitos.length) throw new Error(`Conflito: ${conflitos.join(', ')}`);
 await prisma.colunaTurma.create({data:{nome:String(f.get('nome')),horaInicio,horaFim,sala:String(f.get('sala')),professor:String(f.get('professor')),areaId}});
 return;
}
export async function createSocioeducando(f:FormData):Promise<void>{await prisma.socioeducando.create({data:{nome:String(f.get('nome')),turma:String(f.get('turma')||''),unidadeId:String(f.get('unidadeId'))}})}
export async function allocate(f:FormData):Promise<void>{const unidadeId=String(f.get('unidadeId')), turmaId=String(f.get('turmaId')), socioeducandoId=String(f.get('socioeducandoId'));const [t,s]=await Promise.all([prisma.colunaTurma.findFirst({where:{id:turmaId,area:{turno:{unidadeId}}}}),prisma.socioeducando.findFirst({where:{id:socioeducandoId,unidadeId}})]);if(!t||!s)throw new Error('Seleção inválida para a unidade');const other=await prisma.alocacao.findMany({where:{socioeducandoId},include:{turma:true}});if(other.some(x=>x.turma.horaInicio<t.horaFim&&t.horaInicio<x.turma.horaFim))throw new Error('Socioeducando já está alocado em horário conflitante');await prisma.alocacao.create({data:{turmaId,socioeducandoId}})}
export async function deleteTurma(f:FormData):Promise<void>{await prisma.colunaTurma.delete({where:{id:String(f.get('id'))}})}
