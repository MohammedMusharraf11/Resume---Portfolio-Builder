# PowerShell script to test upload API

Write-Host "=== Testing Upload API ===" -ForegroundColor Cyan

# Step 1: Register/Login
Write-Host "`n1. Getting authentication token..." -ForegroundColor Yellow
$loginResponse = curl.exe -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@upload.com\",\"password\":\"Test123456\"}' `
  2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Login failed. Server might not be running." -ForegroundColor Red
    exit 1
}

Write-Host "Login response: $loginResponse" -ForegroundColor Green

# Extract token (simple string parsing)
$token = ($loginResponse | ConvertFrom-Json).token

if (-not $token) {
    Write-Host "Failed to get token" -ForegroundColor Red
    exit 1
}

Write-Host "Token obtained: $($token.Substring(0, 20))..." -ForegroundColor Green

# Step 2: Create a test image
Write-Host "`n2. Creating test image..." -ForegroundColor Yellow
$base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
$imageBytes = [Convert]::FromBase64String($base64Image)
$testImagePath = "test-upload-image.png"
[IO.File]::WriteAllBytes($testImagePath, $imageBytes)
Write-Host "Test image created: $testImagePath" -ForegroundColor Green

# Step 3: Test profile picture upload
Write-Host "`n3. Testing profile picture upload..." -ForegroundColor Yellow
$uploadResponse = curl.exe -X POST http://localhost:5000/api/upload/profile `
  -H "Authorization: Bearer $token" `
  -F "image=@$testImagePath" `
  2>$null

Write-Host "Upload response: $uploadResponse" -ForegroundColor Green

# Parse response
try {
    $uploadData = $uploadResponse | ConvertFrom-Json
    if ($uploadData.success) {
        Write-Host "`n✅ SUCCESS! Image uploaded to Cloudinary" -ForegroundColor Green
        Write-Host "URL: $($uploadData.url)" -ForegroundColor Cyan
        Write-Host "Public ID: $($uploadData.publicId)" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ FAILED: $($uploadData.message)" -ForegroundColor Red
    }
} catch {
    Write-Host "`n❌ Failed to parse response" -ForegroundColor Red
    Write-Host "Raw response: $uploadResponse" -ForegroundColor Yellow
}

# Step 4: Test project image upload
Write-Host "`n4. Testing project image upload..." -ForegroundColor Yellow
$projectResponse = curl.exe -X POST http://localhost:5000/api/upload/project `
  -H "Authorization: Bearer $token" `
  -F "image=@$testImagePath" `
  2>$null

Write-Host "Upload response: $projectResponse" -ForegroundColor Green

try {
    $projectData = $projectResponse | ConvertFrom-Json
    if ($projectData.success) {
        Write-Host "`n✅ SUCCESS! Project image uploaded to Cloudinary" -ForegroundColor Green
        Write-Host "URL: $($projectData.url)" -ForegroundColor Cyan
        Write-Host "Public ID: $($projectData.publicId)" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ FAILED: $($projectData.message)" -ForegroundColor Red
    }
} catch {
    Write-Host "`n❌ Failed to parse response" -ForegroundColor Red
    Write-Host "Raw response: $projectResponse" -ForegroundColor Yellow
}

# Cleanup
Write-Host "`n5. Cleaning up..." -ForegroundColor Yellow
Remove-Item $testImagePath -ErrorAction SilentlyContinue
Write-Host "Test image removed" -ForegroundColor Green

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
