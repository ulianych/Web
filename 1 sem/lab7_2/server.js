// Установка express сервера
const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();

// Сервер будет обслуживать только статические файлы из директории dist
app.use(cors());
app.use(express.static('./dist'));

// Путь к директории, где хранятся файлы на диске
const FILES_DIR = path.join(__dirname, 'files');

// Маршрутизация для отдачи страницы index.html
app.get('/demo1', (req, res) =>
  res.sendFile('index.html', { root: 'dist/' })
);

// Маршрутизация для скачивания файла
app.get('/download/:file', function(req, res, next) {
  const file_name = FILES_DIR + '/' + req.params.file;
  res.download(file_name, function(err) {
    if (!err) return; // Файл отправлен
    if (err.status !== 404) return next(err); // Ошибка, отличная от 404
    // Файл для скачивания не найден
    res.statusCode = 404;
    res.send('Не удалось найти файл!');
  });
});

const portno = 3000; // Номер порта, который будет использоваться
// Запуск сервера
const server = app.listen(portno, function() {
  const port = server.address().port;
  console.log(
    "Сервер запущен по адресу http://localhost:" +
      port +
      " и обслуживает директорию " +
      __dirname
  );
});