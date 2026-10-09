#!/usr/bin/env bash

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
LAN_IP="$(hostname -I | awk '{print $1}')"


echo "LAN IP: $LAN_IP"

if [ ! -d "$PROJECT_DIR/backend/node_modules" ]; then
  echo "Backend bağımlılıkları kuruluyor..."
  cd "$PROJECT_DIR/backend"
  npm install
fi

if [ ! -d "$PROJECT_DIR/frontend/node_modules" ]; then
  echo "Frontend bağımlılıkları kuruluyor..."
  cd "$PROJECT_DIR/frontend"
  npm install
fi

cat > "$PROJECT_DIR/frontend/.env" <<EOF
EXPO_PUBLIC_API_BASE_URL=http://${LAN_IP}:3000
EXPO_PUBLIC_BACKEND_IP_ADDRESS=${LAN_IP}
EOF

echo "Ngrok başlatılıyor..."
NGROK_PID=""

get_ngrok_url() {
  curl -fsS http://127.0.0.1:4040/api/tunnels 2>/dev/null | node -e '
    let data = "";
    process.stdin.on("data", chunk => data += chunk);
    process.stdin.on("end", () => {
      try {
        const tunnel = JSON.parse(data).tunnels.find(item => item.proto === "https");
        process.stdout.write(tunnel?.public_url ?? "");
      } catch {
        process.stdout.write("");
      }
    });
  ' || true
}

NGROK_URL="$(get_ngrok_url)"

if [ -z "$NGROK_URL" ]; then
  npx --yes ngrok http 3000 > /tmp/music-room-ngrok.log 2>&1 &
  NGROK_PID=$!
fi

for attempt in {1..15}; do
  NGROK_URL="$(get_ngrok_url)"

  if [ -n "$NGROK_URL" ]; then
    break
  fi

  sleep 1
done

if [ -z "$NGROK_URL" ]; then
  echo "Ngrok başlatılamadı:"
  cat /tmp/music-room-ngrok.log
  exit 1
fi

echo "Ngrok URL: $NGROK_URL"

export BACKEND_PUBLIC_URL="$NGROK_URL"
export GOOGLE_REDIRECT_URI="${NGROK_URL}/auth/google/callback"
export FACEBOOK_REDIRECT_URI="${NGROK_URL}/auth/facebook/callback"

cleanup() {
  kill "$NGROK_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

cd "$PROJECT_DIR"

echo "Docker servisleri başlatılıyor..."
docker compose up -d --build db backend

echo "Frontend başlatılıyor..."
cd "$PROJECT_DIR/frontend"
npx expo start --lan --go -c