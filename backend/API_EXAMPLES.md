# Exemples d'appels API Sangus

## Utilisateurs

### Enregistrement
```sh
curl -X POST http://localhost:8000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "motdepasse"}'
```

### Connexion
```sh
curl -X POST http://localhost:8000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "motdepasse"}'
```

## IA

### Génération de code
```sh
curl -X POST http://localhost:8000/ia/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Crée une fonction Python qui additionne deux nombres"}'
```

### Tâche IA asynchrone
```sh
curl -X POST "http://localhost:8000/async-ia-task?prompt=Explique+le+MVC&user_id=1"
```

---

## Avec HTTPie (plus lisible)

```sh
http POST :8000/users/register username=alice password=motdepasse
http POST :8000/ia/generate prompt="Explique le MVC"
```