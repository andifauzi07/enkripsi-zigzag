function encryptZigzag(text, numRows) {
	if (numRows <= 1) {
		return text;
	}

	const result = [];
	for (let i = 0; i < numRows; i++) {
		result.push([]);
	}

	let row = 0;
	let direction = 1; // 1 untuk bergerak ke bawah, -1 untuk bergerak ke atas

	for (const char of text) {
		result[row].push(char);
		row += direction;

		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	let encryptedText = '';
	for (let i = 0; i < numRows; i++) {
		encryptedText += result[i].join('');
	}

	return encryptedText;
}

function decryptZigzag(encryptedText, numRows) {
	if (numRows <= 1) {
		return encryptedText;
	}

	const bingkai = [];
	for (let i = 0; i < numRows; i++) {
		bingkai.push([]);
	}

	let row = 0;
	let direction = 1;

	for (const char of encryptedText) {
		bingkai[row].push(null);
		row += direction;

		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	let charIndex = 0;

	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < bingkai[i].length; j++) {
			bingkai[i][j] = encryptedText[charIndex];
			charIndex++;
		}
	}

	let decryptedText = '';

	row = 0;
	direction = 1;

	for (let i = 0; i < encryptedText.length; i++) {
		decryptedText += bingkai[row].shift();
		row += direction;

		if (row === 0 || row === numRows - 1) {
			direction = -direction;
		}
	}

	return decryptedText;
}

// const encryptedText = "HOLELWORLD";
// const numRows = 3;
// const decryptedText = decryptZigzag(encryptedText, numRows);
// console.log("Pesan yang telah didekripsi: " + decryptedText);

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question('Masukkan teks yang akan di enkripsi: ', (userInput) => {
	'console.log(`Anda memasukkan: ${userInput}`);';
	const plaintext = userInput;
	const numRows = 3;
	const encryptedText = encryptZigzag(plaintext, numRows);
	console.log('Pesan terenkripsi: ' + encryptedText);
	const decryptedText = decryptZigzag(encryptedText, numRows);
	console.log('Pesan yang telah didekripsi: ' + decryptedText);
	readline.close();
});
