<#
.SYNOPSIS
  Clone jev-mcp onto D: and build it for Cursor / Codex.
.PARAMETER RepoUrl
  Git URL (GitHub SSH or HTTPS). Required.
.PARAMETER Target
  Directory to clone into. Default D:\jev-mcp.
.PARAMETER Mock
  Run doctor with a temporary JEV_MCP_MOCK=1 (no TypeSafe key needed).
.EXAMPLE
  .\scripts\checkout-d-drive.ps1 -RepoUrl git@github.com:YOU/jev-mcp.git -Mock
#>
param(
  [Parameter(Mandatory = $true)]
  [string] $RepoUrl,
  [string] $Target = "D:\jev-mcp",
  [switch] $Mock
)

$previousLocation = Get-Location
$previousErrorAction = $ErrorActionPreference
$hadMock = Test-Path Env:JEV_MCP_MOCK
$previousMock = $env:JEV_MCP_MOCK
$ErrorActionPreference = "Stop"

function Require-Cmd([string] $Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Missing '$Name' on PATH. Install Git and Node.js 20+ first."
  }
}

function Invoke-Native {
  param([string] $Command, [string[]] $Arguments)
  & $Command @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "$Command failed with exit code $LASTEXITCODE."
  }
}

try {
  Require-Cmd git
  Require-Cmd node
  Require-Cmd npm

  $nodeVersion = Invoke-Native -Command node -Arguments @("-v")
  if ($nodeVersion -notmatch '^v(\d+)\.' -or [int] $Matches[1] -lt 20) {
    throw "Node $nodeVersion detected. Install Node.js 20+ first."
  }

  $Target = [System.IO.Path]::GetFullPath($Target)
  New-Item -ItemType Directory -Force -Path (Split-Path $Target -Parent) | Out-Null

  if (Test-Path (Join-Path $Target ".git")) {
    Write-Host "Repo already exists at $Target - pulling main"
    Set-Location -LiteralPath $Target
    Invoke-Native -Command git -Arguments @("fetch", "origin")
    Invoke-Native -Command git -Arguments @("checkout", "main")
    Invoke-Native -Command git -Arguments @("pull", "--ff-only", "origin", "main")
  } elseif (Test-Path -LiteralPath $Target) {
    throw "$Target exists and is not a git repo. Pick another -Target."
  } else {
    Invoke-Native -Command git -Arguments @("clone", $RepoUrl, $Target)
    Set-Location -LiteralPath $Target
  }

  Invoke-Native -Command npm -Arguments @("ci")
  Invoke-Native -Command npm -Arguments @("run", "build")
  if ($Mock) {
    $env:JEV_MCP_MOCK = "1"
  }

  Write-Host "Running doctor..."
  Invoke-Native -Command node -Arguments @("dist/index.js", "doctor")
  Write-Host "Checkout ready: $Target"
  Write-Host "Point Cursor/Codex MCP args at: $Target\dist\index.js"
  Write-Host "Docs: $Target\docs\install.md"
} finally {
  Set-Location -LiteralPath $previousLocation.Path
  if ($hadMock) {
    $env:JEV_MCP_MOCK = $previousMock
  } else {
    Remove-Item Env:JEV_MCP_MOCK -ErrorAction SilentlyContinue
  }
  $ErrorActionPreference = $previousErrorAction
}
