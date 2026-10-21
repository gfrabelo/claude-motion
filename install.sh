#!/usr/bin/env bash
# Instala o mínimo para a skill de motion: Node.js, Claude Code e o plugin (Mac e Linux).
#   curl -fsSL https://raw.githubusercontent.com/gfrabelo/claude-motion/main/install.sh | bash
# Pode rodar quantas vezes quiser: o que já estiver instalado é pulado.
set -euo pipefail

REPO="gfrabelo/claude-motion"
MARKET="gabrielrabelo"
PLUGIN="motion"

step() { printf "\n\033[1m→ %s\033[0m\n" "$1"; }
ok() { printf "  ✔ %s\n" "$1"; }
fail() { printf "  ✖ %s\n" "$1"; exit 1; }

export PATH="$HOME/.local/bin:$PATH"

# 1 · Node.js 20+
step "Node.js"
node_ok() { command -v node >/dev/null 2>&1 && [ "$(node -v | sed 's/^v//; s/\..*//')" -ge 20 ]; }
if ! node_ok; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] || curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash >/dev/null
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm install --lts >/dev/null
  nvm alias default 'lts/*' >/dev/null
fi
node_ok && ok "node $(node -v)" || fail "não consegui instalar o Node.js. Instale a versão LTS em https://nodejs.org e rode de novo."

# 2 · Claude Code (o comando `claude`, usado para instalar plugins)
step "Claude Code"
if ! command -v claude >/dev/null 2>&1; then
  curl -fsSL https://claude.ai/install.sh | bash >/dev/null
  export PATH="$HOME/.local/bin:$PATH"
fi
command -v claude >/dev/null 2>&1 && ok "$(claude --version 2>/dev/null | head -1)" || fail "não consegui instalar o Claude Code."

# 3 · Plugin com a skill
step "Skill de motion"
if claude plugin marketplace list 2>/dev/null | grep -q "$MARKET"; then
  claude plugin marketplace update "$MARKET" >/dev/null 2>&1 || true
else
  claude plugin marketplace add "$REPO" >/dev/null
fi
claude plugin install "$PLUGIN@$MARKET" >/dev/null 2>&1 || claude plugin update "$PLUGIN@$MARKET" >/dev/null 2>&1 || true
claude plugin list 2>/dev/null | grep -q "$PLUGIN@$MARKET" && ok "instalada: /$PLUGIN:criar-video" || fail "não consegui instalar o plugin."

# 4 · Pasta de trabalho (fora de Documentos/Mesa/Downloads, que o macOS bloqueia no render)
mkdir -p "$HOME/videos"
step "Tudo pronto!"
cat <<EOF
  Seus vídeos ficam em ~/videos.
  Próximo passo: abra uma conversa NOVA no Claude Code (ou na aba Code do app),
  numa pasta dentro de ~/videos, e peça:

    /motion:criar-video  Um motion de 15s para Reels sobre <assunto>,
    nessa linguagem: <link de referência>. Vai com tudo.
EOF
