all: clean build

clean:
	@rm -rf dist typings &>/dev/null

build:
	@yarn transpile
