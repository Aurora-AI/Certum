# https://thebookofshaders.com/appendix/02/

How to print this book?
-----------------------

Letâs say you donât want to navigate or interact with the examples and you just want a good old fashion text book which you can read on the beach or on your commute to the city. In that case you can print this book.

#### Installing glslViewer

For printing this book you need first to parse it. For that you will need [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) a console shader tool that will compile and transform the shader examples into images.

In **MacOSX** get sure to have [homebrew](http://brew.sh/) installed and then on your terminal do:

```
brew install glslviewer
```

On **Raspberry Pi** you need to get [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), a Debian-based Linux distribution made for Raspberry Pi and then do:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Installing Python 3, Latex Engine and Pandoc

For parsing the Markdown chapters into Latex and then into a PDF file we will use Xetex Latex Engine and Pandoc.

In **MacOSX**:

Download and Install MacTeX by:

```
brew install --cask mactex-no-gui
```

and then install [Pandoc](http://johnmacfarlane.net/pandoc/) and Python 3 by:

```
brew install pandoc python
```

On **Raspberry Pi** (Raspbian):

```
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Compile the book into a pdf and print it

Now that you have all you need, it is time to clone [the repository of this book](https://github.com/patriciogonzalezvivo/thebookofshaders) and compile the book.

For that open your terminal once again and type:

```
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

If everything goes well, you will see a `book.pdf` file which you can read on your favorite device or print.

#### Compile the book into an epub for use with an e-reader

```
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

The generated `book.epub` can be used directly, or converted to a `.mobi` file for use with Kindle by using a converter, for example Calibre.