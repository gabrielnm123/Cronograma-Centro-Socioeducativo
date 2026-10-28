# PLAN.md — Plano de Desenvolvimento ERP Socioeducativo

## Etapa 1: Git e estrutura inicial
- [x] Inicializar repositório Git.
- [x] Criar `.gitignore` para dependências, builds, ambiente e temporários.
- [x] Manter `CRONOGRAMA.docx` na raiz.
- [x] Registrar commits estruturados em português.

## Etapa 2: Banco PostgreSQL, multi-unidades e horários
- [x] Configurar Prisma com `UnidadeSocioeducativa`, `CronogramaTurno`, `AreaAtividade`, `ColunaTurma` e `Socioeducando`.
- [x] Adicionar `horaInicio` e `horaFim` em minutos.
- [x] Configurar PostgreSQL local via `docker-compose.yml`.
- [ ] Executar `prisma migrate dev` e seed: bloqueado por PostgreSQL já ocupando `localhost:5432` com credenciais desconhecidas.
- [x] Fluxo de gestão com seletores de unidade, turnos, áreas, turmas, socioeducandos e alocações.
- [x] Isolamento por unidade e validação de conflito de alocação por intervalo.
- [x] Exportação Word baseada nos dados persistidos, com listas verticais de socioeducandos.
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
- Banco local: compose preparado para PostgreSQL 16 em `localhost:5432`, mas não iniciado porque a porta já está ocupada.
- Pendências: migration/seed após obter acesso ao PostgreSQL da porta 5432, dados reais no exportador e Server Actions de mutação.
- Regra operacional: atualizar este arquivo ao concluir cada etapa.
