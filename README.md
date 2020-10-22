### Публикация нового docker image
```
// 1) Залогиниться, если еще не логинился:
docker login -u quantronsystems -p ****

// 2) Собрать образ:
docker build --tag quant-connect:ВЕРСИЯ --no-cache -f ./docker/production.dockerfile ./

// 3) Привязать образ к репозиторию:
docker tag quant-connect:ВЕРСИЯ quantronsystems/quant-connect:ВЕРСИЯ

// 4) Запушить новую версию:
docker push quantronsystems/quant-connect:ВЕРСИЯ
```

