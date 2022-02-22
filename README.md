# Fullcycle - Desafio Docker

## Nginx com Node.js

Neste desafio utilizaremos nginx como proxy reverso. A porta 8080 servirá um servidor nginx que estará rodando na sua porta 80 e escutanddo uma aplicação nodeJs na porta 3000. Quando a aplicação for chamada um novo registro será inserido no banco e será mostrada a mensagem **Full Cycle Rocks!** com uma listagem com os usuários inseridos no banco abaixo dela. 

---

### Para rodar a aplicação utilize o docker-compose.

```
docker-compose up -d 
```

### Para acessar, digite o seguinte endereço no navegador:

[http://localhost:8080/](http://localhost:8080/)
