# Run manually to verify the npm-installed command in a disposable project.
$ErrorActionPreference = 'Stop'
$totemCommand = (Get-Command aegis-totem -ErrorAction Stop).Source
function Invoke-TotemSmoke {
    param([string[]]$CliArgs)
    & $totemCommand @CliArgs
    if ($LASTEXITCODE -ne 0) { throw "AEGIS command failed: $($CliArgs -join ' ') (exit $LASTEXITCODE)" }
}
$totemVersion = (& $totemCommand --version | Out-String).Trim()
if ($totemVersion -ne '0.1.2') { throw "Expected public CLI 0.1.2; found '$totemVersion'." }
$totemSmokeProject = Join-Path $env:TEMP ('AEGIS-Public-CLI-Test-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path (Join-Path $totemSmokeProject 'src\core'),(Join-Path $totemSmokeProject 'docs\guides') -Force | Out-Null
Push-Location $totemSmokeProject
try {
    Invoke-TotemSmoke -CliArgs @('start','--json')
    Invoke-TotemSmoke -CliArgs @('lane','create','builder')
    Invoke-TotemSmoke -CliArgs @('lane','create','reviewer')
    Invoke-TotemSmoke -CliArgs @('lane','message','builder','--to','reviewer','-m','Please review the parser boundary before editing.')
    Invoke-TotemSmoke -CliArgs @('totem','append','src','--actor','builder','--kind','verification','-m','Initialized public CLI smoke project and recorded a handoff.')
    Invoke-TotemSmoke -CliArgs @('validate')
    Invoke-TotemSmoke -CliArgs @('status')
    foreach ($totemSmokeFile in @('ROOT_TOTEM.md','src\TOTEM.md','docs\TOTEM.md','.aegis\lanes\builder.md','.aegis\lanes\reviewer.md')) {
        if (-not (Test-Path -LiteralPath $totemSmokeFile)) { throw "Missing expected file: $totemSmokeFile" }
    }
    Write-Host 'PASS: public CLI initialization, two lanes, handoff, folder append and validation.' -ForegroundColor Green
    Write-Host "Test files retained at: $totemSmokeProject"
}
finally {
    Pop-Location
}
