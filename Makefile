# start mongo locally
mongo-repl:
	docker exec -it fango-mongo-rs0 mongo
mongo-repl-compose:
	docker-compose -f ./docker-compose.yml exec -T fango-mongo-rs0 mongo
