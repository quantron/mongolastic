# start mongo locally
mongo-repl:
	docker exec -it fango-mongo-rs0 mongo
mongo-repl-compose:
	docker-compose -f ./docker-compose.yml exec -T fango-mongo-rs0 mongo

docker-build-image:
	docker build --tag quant-connect:0.0.3 --no-cache -f ./docker/production.dockerfile ./
