# Backend

### Informasi

File ini merupakan tugas lanjutan dari intermediate backend klik untuk melihat materi [ini]. Project ini disimulasikan dapat create, read, update, dan delete suatu product barang melalui perintah standar yang ada di Sql yang terintegrasi dengan REST API dan disimulasikan melalui postman. Sedangkan hasil tugas beginer backend [cek disini].

### Modules
1. [Expressjs]
2. [MySql2]
3. [Dotenv]
4. [CORS]
5. [Body Parser]
6. [bcrypt]
7. [jsonwebtoken] atau JWT
8. [lodash] contoh klik [disini]
9. [redis]
10. [multer]

### Dev Modules
1. [Nodemon]
2. [ESLint]

---

[ini]: https://view.genial.ly/6016b1c223fd8e1022267712/learning-experience-challenges-presentation
[Expressjs]: https://www.npmjs.com/package/express
[MySql2]: https://www.npmjs.com/package/mysql2
[Dotenv]: https://www.npmjs.com/package/dotenv
[CORS]: https://www.npmjs.com/package/cors
[Body Parser]: https://www.npmjs.com/package/body-parser
[Nodemon]: https://www.npmjs.com/package/nodemon
[ESLint]: https://eslint.org/docs/user-guide/getting-started
[bcrypt]: https://www.npmjs.com/package/bcrypt
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[lodash]: https://www.npmjs.com/package/lodash
[disini]: https://lodash.com/docs/4.17.15
[redis]: https://www.npmjs.com/package/redis
[cek disini]: https://github.com/tomimandalap/beginer_backend/tree/master
[multer]: https://www.npmjs.com/package/multer


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
"npm run start" //untuk menjalankan nodemon cek di file package.json
```
guna untuk menjalankan project ini. Pastikan anda telah mengaktifkan XAMPP

---

### Testing Server

- Kita dapat melakukan test CRUD melalui postman dengan cara sebagai berikut:
```
Silahkan masukkan link berikut ini dikolom url postman pilih mehode GET

http://54.160.187.21:3000/

Hasil akan muncul respon seperti berikut ini:
{
  message: "Welcome to Project CRUD REST API"
}
```
  
- Kemudian ubah url menjadi "http://54.160.187.21:3000/register" pilih methode POST
- Kemudian set ke ```Body``` pilih ```raw``` lalu ubah type menjadi ```JSON```
- lalu inputkan text berikut:
```
contoh saja (dapat diisi dengan data diri sendiri)
=================================
{
    "name": "Joko Widodo",
    "email": "jkw@gmail.com",
    "pass": "isipasswordnya",
    "access": 0
}
=================================

Note: access 0 untuk akses admin sedangkan access 1 untuk cashier

Hasil akan muncul respon seperti berikut ini:
// Respon Berhasil
{
    "code": 200,
    "message": "Create data user success",
    "pagination": {},
    "data": {******}
}

// Respon Jika Email sudah terdaftar
{
    "message": "Email registered!"
}
```

- Kemudian ubah url menjadi "http://54.160.187.21:3000/login" pilih methode POST
- Kemudian set ke ```Body``` pilih ```raw``` lalu ubah type menjadi ```JSON```
- lalu inputkan text berikut:
```
{
    "name": "Joko Widodo",
    "email": "jkw@gmail.com",
    "pass": "pastikan pasword sama dengan sesi register",
    "access": 0
}

Hasil akan muncul respon seperti berikut ini:
// Respon Berhasil
{
    "message": "Login Success",
    "token": "anda akan mendapat kode Token"
}

// Respon Jika email tidak terdaftar
{
    "message": "Email not found!"
}

// Respon jika password salah
{
    "message": "Login failed, password wrong!"
}

Note: silahkan copy kode tokennya!
```

### Test akses ke endpoint

Project ini memiliki beberapa endpoint sebagai berikut:
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
 
 <table>
 	<tr>
 		<th>USER</th>
    <th>ENDPOINT</th>
    <th>KODE ACCESS</th>
    <th>HAK ACCESS</th>
 	</tr>
 	<tr>
 		<td> Admin </td>
 		<td> PRODUCT </td>
    <td> 0 </td>
    <td> POST | GET ALL | PUT | PATCH | DELETE DATA </td>
 	</tr>
  <tr>
 		<td> Cashier </td>
 		<td> PRODUCT </td>
    <td> 1 </td>
    <td> POST | GET DETAIL | PUT | PATCH | DELETE DATA </td>
 	</tr>
  <tr>
 		<td> Admin </td>
 		<td> CATEGORY </td>
    <td> 0 </td>
    <td> POST | GET ALL | PUT | PATCH | DELETE DATA </td>
 	</tr>
  <tr>
 		<td> Cashier </td>
 		<td> CATEGORY </td>
    <td> 1 </td>
    <td> POST | GET DETAIL | PUT | PATCH | DELETE DATA </td>
 	</tr>
  <tr>
 		<td> Admin </td>
 		<td> HISTORY </td>
    <td> 0 </td>
    <td> POST | GET ALL | PUT | PATCH | DELETE DATA </td>
 	</tr>
  <tr>
 		<td> Cashier </td>
 		<td> HISTORY </td>
    <td> 1 </td>
    <td> POST | GET DETAIL | PUT | PATCH | DELETE DATA </td>
 	</tr>
 </table>
</body>
</html>

- Ubah url menjadi "http://54.160.187.21:3000/product" pilih methode ```GET``` lalu tekan tombol ```Send```
```
// Repons jika token tidak ada
{
    "message": "token required"
}
```

- Masukan terlebih dahulu kode token yang sebelumnya diperoleh dari sesi ```Login```
- Kemudian set ke ```Headers``` input bagian ```KEY``` dengan teks ```token```
- input bagian ```VALUE``` dengan kode token ```xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx```

```
{
    "code": 200,
    "message": "Get all data product from redis success",
    "pagination": {
        "page": 1,
        "limit": 4,
        "totalData": 25,
        "totalPage": 7
    },
    "data": [
        {
            "id": 1,
            "date": "2021-01-16T09:39:09.000Z",
            "category": "Coffee",
            "name": "Espresso",
            "image": "https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-1240w.jpg",
            "price": 20000
        },
        {
            data seterusnya
        }
    ]
}
```

Lakukan hal yang sama dimasing-masing methode URL nya, untuk mempermudah silahkan impor file ```POSTMAN``` yang sudah kami sediakan. 
Silahkan klik link berikut ini https://github.com/tomimandalap/beginer_backend/tree/ibackend/Data

## Frontend
Silahkan klik [disini](https://github.com/tomimandalap/lambancoffee)
