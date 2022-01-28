.PHONY: start-ui start-api install build dev run test-unit test-e2e test clean-api clean-ui clean

start-api:
	cd api && npm run start &

start-ui:
	npm run start

install:
	git submodule update --init --recursive
	npm install
	cd api && npm install

dev: start-api start-ui

build:
	npm run build

run: dev

test-unit:
	npm run test:unit

test-e2e:
	npm run test:e2e

test: test-unit test-e2e

clean-api:
	cd api && rm -rf node_modules

clean-ui:
	rm -rf node_modules
	rm -rf dist

clean: clean-api clean-ui