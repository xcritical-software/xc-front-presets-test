Набор утилит для компиляции и генерации доков для react компонентов
===================================================================

gulpfile
--------
Готовый gulpfile со всеми настройками, необходимыми для сборки библиотеки

Ваш `package.json`:
```
"compile": "gulp --cwd . --gulpfile ./node_modules/@xcritical/xc-front-libs-utils/gulpfile.js compile",
```

Для более тонкой настройки используйте gulp-tasks.

gulp-tasks
----------

Вы можете использовать готовый набор gulp-задач.

Пример `gulpfile` вашего проекта:
```
const createTasks = require('@xcritical/xc-front-libs-utils/gulp-tasks');
createTasks('xc-front-kit');
```

Таким образом будет создана задача:

* `gulp compile` - компиляция css/js файлов библиотеки, подготовка к публикации.

componentPackage
----------------

Плагин для создания package.json из всех файлов. Нужен для упрощения импортов. В случае, если ваша библиотека имеет
структуру типа

```
component-name/
    component-name.js
```

создание `package.json` поможет использовать этот компонент как `require('library-name/component-name')`.

Пример использования:

```js
const componentPackage = require('@xcritical/xc-front-libs-utils/gulp/component-package');

gulp.src('file.js')
    .pipe(componentPackage())
    .pipe(gulp.dest('dist'));
```

В результате в папке `dist` будет создан файл `package.json`:

```json
{ "main": "file.js", "typings": "file.d.ts" }
```
Лицензия
--------

```
The MIT License (MIT)

Copyright (c) 2017 Alfa Laboratory

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```