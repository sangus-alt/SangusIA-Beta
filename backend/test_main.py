import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_register_and_login():
    # Register
    r = client.post("/users/register", json={"username": "bob", "password": "secret"})
    assert r.status_code == 200
    data = r.json()
    assert data["username"] == "bob"
    user_id = data["id"]

    # Login ok
    r2 = client.post("/users/login", json={"username": "bob", "password": "secret"})
    assert r2.status_code == 200
    assert "Login successful" in r2.json()["message"]

    # Login failed
    r3 = client.post("/users/login", json={"username": "bob", "password": "wrong"})
    assert r3.status_code == 400

def test_ia_generate():
    prompt = "Crée une fonction Python qui multiplie deux nombres"
    r = client.post("/ia/generate", json={"prompt": prompt})
    assert r.status_code == 200
    assert "Code généré" in r.json()["result"]

def test_async_ia():
    r = client.post("/async-ia-task?prompt=Hello&user_id=1")
    assert r.status_code == 200
    assert r.json()["status"].startswith("Traitement IA")