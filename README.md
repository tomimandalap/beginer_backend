# beginer_backend

### Informasi

File ini merupakan contoh pembuatan database CRUD di MySql dengan REST API melalui tools Postman. Project ini disimulasikan dapat create, read, update, dan delete suatu product barang melalui perintah standar yang ada di Sql yang terintegrasi dengan REST API dan disimulasikan melalui postman.

### Modules

1. [Expressjs]
2. [MySql2]
3. [Dotenv]
4. [CORS]
5. [Body Parser]

### Dev Modules
1. [Nodemon]
2. ESLint

---

[Expressjs]: https://www.npmjs.com/package/express
[MySql2]: https://www.npmjs.com/package/mysql2
[Dotenv]: https://www.npmjs.com/package/dotenv
[CORS]: https://www.npmjs.com/package/cors
[Body Parser]: https://www.npmjs.com/package/body-parser
[Nodemon]: https://www.npmjs.com/package/nodemon
[ESLint]: 



### Tatacara

1. Silahkan download file ini.
2. Silahkan buka file ini dalam satu folder di text editor  seperti VS Code atau sejenisnya
3. Pastikan import database yang ada didalam file ```MySql``` sebagai database di MySql
4. Patikan isi ``` PORT ``` yang akan kamu gunakan di file ``` .env ``` sesuaikan juga dengan yang ada di ``` app.listen ``` pada file ``` app.js ```
5. Silahkan ganti nama database, user dan password pada file ``` .env ``` sesuai dengan MySql kalian. Umumnya seperti berikut:
```
DBHOST= localhost
DBUSER= root
DBPASS= 
DB    = nama_databasenya
```
  
Untuk pengguna OS windows biasanya bagian passowd di xampp itu kosong, tetapi pengguna Mac silahakn isi passwordnya.

### Penggunaan

Silahkan buka terminal pada VS Code dengan menekan tombol
```
CTRL + SHIFT + `
atau
CTRL + SHIFT + C
```
Kemudian ketikan text berikut
```
"npm run start" //unutk menjalankan nodemon cek di file package.json
```
guna untuk menjalankan project ini. Pastikan anda telah mengaktifkan XAMPP
