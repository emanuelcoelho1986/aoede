.PHONY: install build run test-unit test-e2e test clean

install:
	npm install

build:
	npm run build

run:
	npm run start

test-unit:
	npm run test:unit

test-e2e:
	npm run test:e2e

test: test-unit test-e2e

clean:
	rm -rf node_modules
	rm -rf dist