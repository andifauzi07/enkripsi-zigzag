// Fungsi untuk mengenkripsi pesan dengan pola Zigzag
const encryptZigzag = (text, numRows) => {
	// Validasi jika numRows kurang dari atau sama dengan 1
	if (numRows <= 1) {
		return text; // Kembalikan pesan jika tidak perlu dienkripsi
	}

	// Inisialisasi bingkai untuk menyimpan karakter pesan yang akan dienkripsi
	const bingkai = [];
	for (let i = 0; i < numRows; i++) {
		bingkai.push([]);
	}

	let row = 0; // Indeks baris awal
	let direction = 1; // Arah pergerakan (1 untuk ke bawah, -1 untuk ke atas)

	// Langkah pertama: Menempatkan karakter pesan ke dalam bingkai
	for (const char of text) {
		bingkai[row].push(char); // Tambahkan karakter ke baris yang sesuai
		row += direction;

		// Ubah arah jika mencapai batas atas atau bawah bingkai
		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	let encryptedText = ''; // Variabel untuk menyimpan pesan terenkripsi

	// Langkah kedua: Mengambil karakter dari bingkai dalam urutan yang benar
	for (let i = 0; i < numRows; i++) {
		encryptedText += bingkai[i].join(''); // Ambil karakter dan gabungkan dalam baris
	}

	return encryptedText; // Kembalikan pesan yang telah dienkripsi
};

// fungsi dekripsi zigzag

const decryptZigzag = (encryptedText, numRows) => {
	// validasi jika numRows kurang dari atau sama dengan 1
	if (numRows <= 1) {
		return encryptedText; //kembalikan pesan jika tidak perlu di dekripsi
	}

	// inisialisasi bingkai untuk menyimpan karakter pesan terdekripsi
	const bingkai = [];
	for (let i = 0; i < numRows; i++) {
		bingkai.push([]);
	}

	let row = 0; //indeks baris awal adalah 0
	let direction = 1; //arah pergerakan 1 untuk kebawah, dan -1 untuk ke atas

	// langkah pertama: Menentukan posisi karakter pada bingkai
	for (const char of encryptedText) {
		bingkai[row].push(null); // tambahkan null untuk menunjukkan posisi yang akan di isi
		row += direction;

		// kondisi di mana arah akan berubah jika mencapai atas atau bawah bingkai
		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	let charIndex = 0; //indeks karakter pada pesan terenkripsi

	//Langkah kedua: Isi bingkai dengan karakter2 pesan terenkripsi
	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < bingkai[i].length; j++) {
			bingkai[i][j] = encryptedText[charIndex];
			charIndex++;
		}
	}

	let decryptedText = ''; //variabel kosong untuk menyimpan pesan terdekripsi

	row = 0; //Reset indeks baris
	direction = 1; //reset arah pergerakan

	//Langkah ketiga: Ambil karakter dari bingkai dalam urutan yang benar
	for (let i = 0; i < encryptedText.length; i++) {
		decryptedText += bingkai[row].shift(); //ambil karakter dan hapus dari bingkai
		row += direction;

		//ubah arah jika mencapai batas atas atau bawah
		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	return decryptedText; //kembalikan hasil kedalam variabel kosong untuk menyimpan pesan terdekripsi
};

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question('Masukkan teks yang akan di enkripsi: ', (userInput) => {
	readline.question('Masukkan lebar baris: ', (numRows) => {
		const encryptedText = encryptZigzag(userInput, numRows);
		console.log('Pesan terenkripsi: ' + encryptedText);
		const decryptedText = decryptZigzag(encryptedText, numRows);
		console.log('Pesan yang telah didekripsi: ' + decryptedText);
		readline.close();
	});
});
