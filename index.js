// Fungsi untuk mengenkripsi pesan dengan pola Zigzag
const encryptZigzag = (text, numRows) => {
	// Validasi jika numRows kurang dari atau sama dengan 1
	if (numRows <= 1) {

		// Kembalikan pesan jika tidak perlu dienkripsi
		return text; 
	}

	// Inisialisasi bingkai untuk menyimpan karakter pesan yang akan dienkripsi
	const bingkai = [];
	for (let i = 0; i < numRows; i++) {
		bingkai.push([]);
	}

	// Indeks baris awal
	let row = 0; 

	// Arah pergerakan (1 untuk ke bawah, -1 untuk ke atas)
	let direction = 1; 

	// Langkah pertama: Menempatkan karakter pesan ke dalam bingkai
	for (const char of text) {

		// Tambahkan karakter ke baris yang sesuai
		bingkai[row].push(char); 
		row += direction;

		// Ubah arah jika mencapai batas atas atau bawah bingkai
		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	// Variabel kosong untuk menyimpan pesan hasil enkripsi
	let encryptedText = ''; 

	// Langkah kedua: Mengambil karakter dari bingkai dalam urutan yang benar
	for (let i = 0; i < numRows; i++) {

		// Ambil karakter dan gabungkan dalam baris
		encryptedText += bingkai[i].join(''); 
	}

	// Kembalikan pesan yang telah dienkripsi
	return encryptedText; 
};

// fungsi dekripsi zigzag

const decryptZigzag = (encryptedText, numRows) => {
	// validasi jika numRows kurang dari atau sama dengan 1
	if (numRows <= 1) {

		//kembalikan pesan jika tidak perlu di dekripsi
		return encryptedText; 
	}

	// inisialisasi bingkai untuk menyimpan karakter pesan terdekripsi
	const bingkai = [];
	for (let i = 0; i < numRows; i++) {
		bingkai.push([]);
	}

	//indeks baris awal adalah 0
	let row = 0; 

	//arah pergerakan 1 untuk kebawah, dan -1 untuk ke atas
	let direction = 1; 

	// langkah pertama: Menentukan posisi karakter pada bingkai
	for (const char of encryptedText) {

		// tambahkan null untuk menunjukkan posisi yang akan di isi
		bingkai[row].push(null); 
		row += direction;

		// kondisi di mana arah akan berubah jika mencapai atas atau bawah bingkai
		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	//indeks karakter pada pesan terenkripsi
	let charIndex = 0; 

	//Langkah kedua: Isi bingkai dengan karakter2 pesan terenkripsi
	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < bingkai[i].length; j++) {
			bingkai[i][j] = encryptedText[charIndex];
			charIndex++;
		}
	}

	//variabel kosong untuk menyimpan pesan terdekripsi
	let decryptedText = ''; 

	//Reset indeks baris
	row = 0; 

	//reset arah pergerakan
	direction = 1; 

	//Langkah ketiga: Ambil karakter dari bingkai dalam urutan yang benar
	for (let i = 0; i < encryptedText.length; i++) {

		//ambil karakter dan hapus dari bingkai
		decryptedText += bingkai[row].shift(); 
		row += direction;

		//ubah arah jika mencapai batas atas atau bawah
		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	//kembalikan hasil kedalam variabel kosong untuk menyimpan pesan terdekripsi
	return decryptedText; 
};

//fungsi membuat interface pada terminal
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

//membuka interface pada terminal agar user dapat memasukkan input plaint teks
readline.question('Masukkan teks yang akan di enkripsi: ', (userInput) => {

	//membuka interface pada terminal kedua kalinya agar user dapat memasukkan input jumlah baris
	readline.question('Masukkan lebar baris: ', (numRows) => {

		//mengeksekusi fungsi enkripsi Zigzag di atas berdasarkan user input
		const encryptedText = encryptZigzag(userInput, numRows);

		//menampilkan pada terminal hasil enkripsi 
		console.log('Pesan terenkripsi: ' + encryptedText);

		//mengeksekusi fungsi dekripsi Zigzag di atas berdasarkan user input
		const decryptedText = decryptZigzag(encryptedText, numRows);

		//menampilkan pada terminal hasil dekripsi
		console.log('Pesan yang telah didekripsi: ' + decryptedText);

		//menutup interface pada terminal
		readline.close();
	});
});
