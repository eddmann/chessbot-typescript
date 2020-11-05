IMAGE = node:14.15-alpine
DOCKER = docker run --rm -v $(PWD):/app:rw,delegated -w /app

.PHONY: install
install:
	$(DOCKER) $(IMAGE) yarn install --immutable --immutable-cache

.PHONY: start
start:
	@$(DOCKER) -it -p 3000:3000 $(IMAGE) yarn start

.PHONY: profile
profile:
	@$(DOCKER) -it -p 3000:3000 $(IMAGE) yarn start --profile

.PHONY: lint
lint:
	@$(DOCKER) $(IMAGE) yarn lint

.PHONY: build
build:
	$(DOCKER) $(IMAGE) yarn build

.PHONY: shell
shell:
	@$(DOCKER) -it $(IMAGE) sh
