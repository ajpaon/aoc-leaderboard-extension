.PHONY=clean

build.zip:	manifest.json aocpld.js $(wildcard icons/*.png)
	zip -r build.zip $^

clean:
	rm -r build.zip
