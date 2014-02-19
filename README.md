Note: this is preliminary (version 0.0.1)

## Native Interface Definition

NID is a subset of C/C++ and the concept is inspired by `tolua++` tool for the LUA language. The idea is to write a simplified C/C++ header with additional attributes which should convey the higher-level purpose of the API.

This software provides a parser component written in Node.JS which parses `.nid` files into a JSON structure.

### Couple of rules

* Comments are stripped.
* No preprocessor but `#include <header>` will be parsed and shown in JSON.
* Function and variable declarations are parsed.
* C++11 attributes are shown in JSON and can be used to improve the bindings.

### Usage

As executable:
```
# npm install -g nid
# nid input.nid
```

As dependency:
```
# npm install --save nid
```
```js
var nid = require('nid');
nid.parse(fs.readFileSync('sample.nid').toString('utf8'));
```


### Example (taken from tests)
```c++
#include <stdio.h>
#include <math.h>

FILE* stdin;
FILE* stdout;

int some_random_integer;

namespace std {

  double sqrt(double x);
  float sqrtf(float x);
  long double sqrtl(long double x);
}

[[handle,free(fclose)]] FILE* fopen(const char* filename, const char* mode);

size_t fread([[cast(char*)]] void* ptr, size_t size, size_t nmemb, [[handle]] FILE* stream);

[[destructor]] int fclose(FILE* f);

class Rect {

  Rect(int x, int y, int w, int h);

  [[get(x)]] int x();
  [[set(x)]] void setX(int x);
  [[get(y)]] int y();
  [[set(y)]] void setY(int y);

  [[get(width)]] int width();
  [[set(width)]] void setWidth(int width);
  
  [[get(height)]] int height();
  [[set(height)]] void setHeight(int height);

  int area();

  static int sharedArea(Rect a, Rect b);
};


```


```json
{
  "declarations": [
    {
      "pragma": "#include <stdio.h>"
    },
    {
      "pragma": "#include <math.h>"
    },
    {
      "variable": {
        "type": "FILE",
        "pointer": "*",
        "attributes": {},
        "name": "stdin"
      }
    },
    {
      "variable": {
        "type": "FILE",
        "pointer": "*",
        "attributes": {},
        "name": "stdout"
      }
    },
    {
      "variable": {
        "type": "int",
        "name": "some_random_integer",
        "attributes": {}
      }
    },
    {
      "namespace": {
        "name": "std",
        "declarations": [
          {
            "function": {
              "type": "double",
              "name": "sqrt",
              "attributes": {},
              "parameters": [
                {
                  "type": "double",
                  "name": "x",
                  "attributes": {}
                }
              ]
            }
          },
          {
            "function": {
              "type": "float",
              "name": "sqrtf",
              "attributes": {},
              "parameters": [
                {
                  "type": "float",
                  "name": "x",
                  "attributes": {}
                }
              ]
            }
          },
          {
            "function": {
              "type": "double long",
              "name": "sqrtl",
              "attributes": {},
              "parameters": [
                {
                  "type": "double long",
                  "name": "x",
                  "attributes": {}
                }
              ]
            }
          }
        ]
      }
    },
    {
      "variable": {
        "type": "FILE",
        "pointer": "*",
        "attributes": {
          "handle": true,
          "free": "fclose"
        },
        "name": "fopen",
        "parameters": [
          {
            "type": "const char",
            "pointer": "*",
            "attributes": {},
            "name": "filename"
          },
          {
            "type": "const char",
            "pointer": "*",
            "attributes": {},
            "name": "mode"
          }
        ]
      }
    },
    {
      "function": {
        "type": "size_t",
        "name": "fread",
        "attributes": {},
        "parameters": [
          {
            "type": "void",
            "pointer": "*",
            "attributes": {
              "cast": "char*"
            },
            "name": "ptr"
          },
          {
            "type": "size_t",
            "name": "size",
            "attributes": {}
          },
          {
            "type": "size_t",
            "name": "nmemb",
            "attributes": {}
          },
          {
            "type": "FILE",
            "pointer": "*",
            "attributes": {
              "handle": true
            },
            "name": "stream"
          }
        ]
      }
    },
    {
      "function": {
        "type": "int",
        "name": "fclose",
        "attributes": {
          "destructor": true
        },
        "parameters": [
          {
            "type": "FILE",
            "pointer": "*",
            "attributes": {},
            "name": "f"
          }
        ]
      }
    },
    {
      "class": {
        "name": "Rect",
        "declarations": [
          {
            "constructor": {
              "name": "Rect",
              "attributes": {},
              "parameters": [
                {
                  "type": "int",
                  "name": "x",
                  "attributes": {}
                },
                {
                  "type": "int",
                  "name": "y",
                  "attributes": {}
                },
                {
                  "type": "int",
                  "name": "w",
                  "attributes": {}
                },
                {
                  "type": "int",
                  "name": "h",
                  "attributes": {}
                }
              ]
            }
          },
          {
            "function": {
              "type": "int",
              "name": "x",
              "attributes": {
                "get": "x"
              },
              "parameters": []
            }
          },
          {
            "function": {
              "type": "void",
              "name": "setX",
              "attributes": {
                "set": "x"
              },
              "parameters": [
                {
                  "type": "int",
                  "name": "x",
                  "attributes": {}
                }
              ]
            }
          },
          {
            "function": {
              "type": "int",
              "name": "y",
              "attributes": {
                "get": "y"
              },
              "parameters": []
            }
          },
          {
            "function": {
              "type": "void",
              "name": "setY",
              "attributes": {
                "set": "y"
              },
              "parameters": [
                {
                  "type": "int",
                  "name": "y",
                  "attributes": {}
                }
              ]
            }
          },
          {
            "function": {
              "type": "int",
              "name": "width",
              "attributes": {
                "get": "width"
              },
              "parameters": []
            }
          },
          {
            "function": {
              "type": "void",
              "name": "setWidth",
              "attributes": {
                "set": "width"
              },
              "parameters": [
                {
                  "type": "int",
                  "name": "width",
                  "attributes": {}
                }
              ]
            }
          },
          {
            "function": {
              "type": "int",
              "name": "height",
              "attributes": {
                "get": "height"
              },
              "parameters": []
            }
          },
          {
            "function": {
              "type": "void",
              "name": "setHeight",
              "attributes": {
                "set": "height"
              },
              "parameters": [
                {
                  "type": "int",
                  "name": "height",
                  "attributes": {}
                }
              ]
            }
          },
          {
            "function": {
              "type": "int",
              "name": "area",
              "attributes": {},
              "parameters": []
            }
          },
          {
            "function": {
              "type": "int static",
              "name": "sharedArea",
              "attributes": {},
              "parameters": [
                {
                  "type": "Rect",
                  "name": "a",
                  "attributes": {}
                },
                {
                  "type": "Rect",
                  "name": "b",
                  "attributes": {}
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
```

