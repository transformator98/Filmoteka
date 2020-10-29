# Filmoteka

# Работа с “GIT” GitHub:

### 1. Клонируете себе dev :

`git clone -b dev git@github.com:transformator98/Filmoteka.git`

### 2. Переходите в ветку:

`dev. git checkout dev`

### 3. Потом создаете свою ветку находясь в ветке dev, с названием своей задачи:

`git checkout -b name_your_branch`

### 4. Работаете только в своей ветке, все изменения пушите ТОЛЬКО в нее:

`git add .` `git commit -m “init name_your_branch”` `git push -u origin name_your_branch`

### 5.

Создаете pull request на слитие вашей ветки с dev там на гитхабе, все далее
работа тим лида, разве что он отклонит Ваш пул реквест и скажет что то доделать
в своей ветке а затем заново

### 6. Пулим все изменения из remote dev в local dev:

`git checkout dev` `git pull`

### 7. Удаляем локальную ветку

`git branch -d имя_ветки`
