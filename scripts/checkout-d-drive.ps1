<#
.SYNOPSIS
  Clone jev-mcp onto D: and build it for Cursor / Codex.

.PARAMETER RepoUrl
  Git URL (GitHub SSH or HTTPS). Required.

.PARAMETER Target
  Directory to clone into. Default D:\jev-mcp

.PARAMETER Mock
  If set, run doctor with JEV_MCP_MOCK=1 (no TypeSafe key needed).

.EXAMPLE
  .\scripts\checkout-d-drive.ps1 -RepoUrl git@github.com:YOU/jev-mcp.git
#>
param(
  [Parameter(Mandatory = $true)]
  [string] $RepoUrl,

  [string] $Target = "D:\jev-mcp",

  [switch] $Mock
)

$ErrorActionPreference = "Stop"

function Require-Cmd([string] $Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Missing '$Name' on PATH. Install Git and Node.js 20+ first."
  }
}

Require-Cmd git
Require-Cmd node
Require-Cmd npm

$nodeVersion = node -v
if ($nodeVersion -notmatch '^v(2[0-9]|[3-9]\d)\.') {
  Write-Warning "Node $nodeVersion detected. jev-mcp wants Node 20+."
}

$drive = Split-Path -Qualifier $Target
if ($drive -ne "D:") {
  Write-Warning "Target is $Target (not on D:). Continuing anyway."
}

New-Item -ItemType Directory -Force -Path (Split-Path $Target -Parent) | Out-Null

if (Test-Path (Join-Path $Target ".git")) {
  Write-Host "Repo already exists at $Target — pulling main"
  Set-Location $Target
  git fetch origin
  git checkout main
  git pull --ff-only origin main
} elseif (Test-Path $Target) {
  throw "$Target exists and is not a git repo. Pick another -Target or remove it."
} else {
  git clone $RepoUrl $Target
  Set-Location $Target
}

npm install
npm run build

if ($Mock) {
  $env:JEV_MCP_MOCK = "1"
}

Write-Host "Running doctor..."
node dist\index.js doctor

Write-Host ""
Write-Host "Checkout ready: $Target"
Write-Host "Point Cursor/Codex MCP args at: $Target\dist\index.js"
Write-Host "Docs: $Target\docs\install.md"
