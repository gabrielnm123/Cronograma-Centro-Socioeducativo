# AGENTS.md — Diretrizes para Agentes de IA (ERP Socioeducativo)

Este repositório contém o **ERP Cronograma Socioeducativo**, um sistema multi-unidade em Next.js para gerenciamento de atividades, turmas, blocos e alocação diária de socioeducandos, com exportação automatizada para o Microsoft Word (`.docx`).

---

## 1. REGRA CRÍTICA DO TEMPLATE WORD (`CRONOGRAMA.docx`)
1. **Localização do Template:** O arquivo modelo `CRONOGRAMA.docx` está localizado estritamente na **pasta raiz** do projeto (`./CRONOGRAMA.docx`).
2. **Preservação do Cabeçalho Oficial:** O arquivo `./CRONOGRAMA.docx` contém o timbre oficial do Governo do Estado do Ceará no cabeçalho nativo. NUNCA crie um arquivo Word do zero.
3. **Injeção de Tabelas:** A engine do servidor DEVE carregar o `./CRONOGRAMA.docx` da raiz, anexando o título do turno e as tabelas das áreas preservando o cabeçalho original.
4. **Orientação Paisagem:** As tabelas devem ser geradas em modo Paisagem (*Landscape*) para permitir a expansão horizontal das colunas e otimização do espaço visual.

---

## 2. REGRAS DE ARQUITETURA MULTI-UNIDADE
1. **Multi-Centro Socioeducativo:** O sistema deve suportar múltiplas unidades socioeducativas (ex: CSCAL, CMF, etc.).
2. **Isolamento de Dados:** Consultas ao banco de dados Prisma devem sempre considerar a chave da unidade selecionada (`unidadeId`).

---

## 3. REGRAS DE CONTROLE DE VERSÃO (GIT)
1. **Versionamento Ativo:** O repositório deve utilizar Git desde a inicialização (`git init`).
2. **Commits Estruturados:** Realize commits atômicos em português a cada funcionalidade ou etapa concluída. Exemplos:
   - `git commit -m "feat: inicializa estrutura multi-unidade e modelo Prisma"`
   - `git commit -m "feat: adiciona verificador de conflitos de sala, professor e socioeducando"`
   - `git commit -m "feat: injeção de tabelas preservando CRONOGRAMA.docx da raiz"`
3. **.gitignore:** Garantir que `node_modules`, `.next`, `.env` e arquivos de build/log fiquem fora do controle de versão.

---

## 4. CHECKLIST DE VALIDAÇÃO
Antes de considerar qualquer etapa concluída:
- [ ] O arquivo `./CRONOGRAMA.docx` da raiz foi lido e mantido intacto.
- [ ] O banco de dados valida os intervalos de horário em minutos para cruzar conflitos.
- [ ] Os commits no Git refletem com clareza a evolução incremental do código.