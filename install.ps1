# Instala o mínimo para a skill de motion: Node.js, Claude Code e o plugin (Windows).
#   irm https://raw.githubusercontent.com/gfrabelo/claude-motion/main/install.ps1 | iex
# Pode rodar quantas vezes quiser: o que já estiver instalado é pulado.
$ErrorActionPreference = "Stop"

$Repo = "gfrabelo/claude-motion"
$Market = "gabrielrabelo"
$Plugin = "motion"

function Step($t) { Write-Host "`n-> $t" -ForegroundColor White }
function Ok($t) { Write-Host "  OK $t" -ForegroundColor Green }
function Refresh-Path { $env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User") + ";$HOME\.local\bin" }

# 1 · Node.js 20+
Step "Node.js"
$nodeOk = $false
if (Get-Command node -ErrorAction SilentlyContinue) { $nodeOk = [int]((node -v).TrimStart("v").Split(".")[0]) -ge 20 }
if (-not $nodeOk) {
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements | Out-Null
  Refresh-Path
}
Ok "node $(node -v)"

# 2 · Claude Code
Step "Claude Code"
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
  irm https://claude.ai/install.ps1 | iex
  Refresh-Path
}
Ok "$(claude --version)"

# 3 · Plugin com a skill
Step "Skill de motion"
if ((claude plugin marketplace list 2>$null) -match $Market) { claude plugin marketplace update $Market 2>$null | Out-Null }
else { claude plugin marketplace add $Repo | Out-Null }
try { claude plugin install "$Plugin@$Market" 2>$null | Out-Null } catch { claude plugin update "$Plugin@$Market" 2>$null | Out-Null }
if ((claude plugin list 2>$null) -match "$Plugin@$Market") { Ok "instalada: /$Plugin`:criar-video" } else { throw "nao consegui instalar o plugin" }

# 4 · Pasta de trabalho
New-Item -ItemType Directory -Force (Join-Path $HOME "videos") | Out-Null
Step "Tudo pronto!"
Write-Host "  Seus videos ficam em $HOME\videos."
Write-Host "  Abra uma conversa NOVA no Claude Code numa pasta dentro de videos e peca:"
Write-Host "    /motion:criar-video  Um motion de 15s para Reels sobre <assunto>, nessa linguagem: <link>. Vai com tudo."
