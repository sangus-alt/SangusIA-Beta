# Guide de déploiement sécurisé Sangus (compte unique maître)

## 1. Pré-requis
- Serveur dédié ou VPS (Ubuntu, Debian, etc.)
- Python ≥ 3.10
- Node.js ≥ 18 (pour le frontend React/Vite)
- Un domaine ou sous-domaine pour Sangus
- (optionnel) GPU pour IA locale/Ollama/Coqui

## 2. Installation du backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python backend/init_master.py  # initialise ton compte maître
```

## 3. Configuration des variables secrètes

- Mets ta clé JWT, ton mot de passe admin, tes clés API (ex ElevenLabs) dans un fichier `.env` :

```
SECRET_KEY=une_cle_ultra_longue_et_secrete
ELEVEN_API_KEY=xxxxxx
ELEVEN_VOICE_ID=xxxxxx
```

- Utilise `python-dotenv` pour charger ces variables à l’exécution.

## 4. Démarrage sécurisé

- Utilise Uvicorn ou Gunicorn en mode production :

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

- Mets un proxy Nginx devant (HTTPS obligatoire) :

```
server {
    listen 443 ssl;
    server_name sangus.example.com;
    ssl_certificate /etc/letsencrypt/live/tondomaine/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tondomaine/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

- Bloque tout accès public à la base de données, au dossier voix, etc.

## 5. Sécurité extrême

- Désactive l’inscription publique, aucune route de création d’utilisateur disponible.
- Seul le compte maître existe et peut administrer.
- Utilise fail2ban et un firewall pour limiter les tentatives.
- Change les mots de passe régulièrement.
- Sauvegarde le dossier `user_voices/` et la DB régulièrement.
- Mets les logs sensibles hors du webroot.

## 6. (Optionnel) Déploiement du frontend

```bash
cd frontend
npm install
npm run build
# Dépose le build dans /var/www/sangus ou équivalent
```
Servez le frontend derrière le même Nginx, en static, ou via un CDN.

---

**Sangus est maintenant ultra-sécurisé, full-admin, et vocalisé avec ta voix !**