# PLAN.md — Plano de Desenvolvimento ERP Socioeducativo

## Etapa 1: Git e estrutura inicial
- [x] Inicializar repositório Git.
- [x] Criar `.gitignore` para dependências, builds, ambiente e temporários.
- [x] Manter `CRONOGRAMA.docx` na raiz.
- [x] Registrar commits estruturados em português.

## Etapa 2: Banco PostgreSQL, multi-unidades e horários
- [x] Configurar Prisma com `UnidadeSocioeducativa`, `CronogramaTurno`, `AreaAtividade`, `ColunaTurma` e `Socioeducando`.
- [x] Adicionar `horaInicio` e `horaFim` em minutos.
- [ ] Executar `prisma migrate dev` contra PostgreSQL disponível.
- [x] Criar `prisma/seed.ts` com dados de teste.
- [x] Registrar commit da modelagem multi-unidade.

## Etapa 3: Engine de injeção no template Word
- [x] Ler `./CRONOGRAMA.docx` com JSZip.
- [x] Injetar conteúdo no DOCX existente, preservando o cabeçalho oficial.
- [x] Aplicar orientação paisagem e cabeçalho de área em cinza escuro.
- [x] Registrar commit da engine de preservação e injeção.

## Etapa 4: Indicadores e conflitos
- [x] Detectar sobreposição de sala, professor e socioeducando.
- [x] Criar `app/dashboard/page.tsx` com indicadores e alertas.
- [x] Registrar commit da fundação do dashboard e detector.

## Etapa 5: Gestão diária
- [x] Criar `app/gestao-diaria/page.tsx` para movimentação entre turmas/blocos.
- [ ] Conectar mutações a Server Actions e persistência real.
- [ ] Registrar commit específico da integração da gestão diária.

## Estado da execução
- Validados: `npx prisma generate`, `npm run typecheck` e `npm run build`.
- Pendências: migration/seed contra PostgreSQL disponível, dados reais no exportador e Server Actions de mutação.
- Regra operacional: atualizar este arquivo ao concluir cada etapa.
