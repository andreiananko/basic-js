const { NotImplementedError } = require('../extensions/index.js')

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
	constructor(direct = true) {
		this.direct = direct
	}

	encrypt(message, key) {
		if (!message || !key) {
			throw new Error('Invalid input')
		}

		const encryptedMessage = this.cipher(message, key, true)
		return this.direct
			? encryptedMessage.join('')
			: encryptedMessage.reverse().join('')
	}

	decrypt(encryptedMessage, key) {
		if (!encryptedMessage || !key) {
			throw new Error('Invalid input')
		}

		const decryptedMessage = this.cipher(encryptedMessage, key, false)
		return this.direct
			? decryptedMessage.join('')
			: decryptedMessage.reverse().join('')
	}

	cipher(message, key, encrypt) {
		const messageChars = message.toUpperCase().split('')
		const keyChars = key.toUpperCase().split('')
		const result = []

		let keyIndex = 0

		for (let i = 0; i < messageChars.length; i++) {
			if (/[A-Z]/.test(messageChars[i])) {
				const messageCharCode = messageChars[i].charCodeAt(0) - 65
				const keyCharCode = keyChars[keyIndex].charCodeAt(0) - 65

				const cipherCharCode = encrypt
					? (messageCharCode + keyCharCode) % 26
					: (messageCharCode - keyCharCode + 26) % 26

				const cipherChar = String.fromCharCode(cipherCharCode + 65)
				result.push(cipherChar)

				keyIndex++
				if (keyIndex === keyChars.length) {
					keyIndex = 0
				}
			} else {
				result.push(messageChars[i])
			}
		}

		return result
	}
}

module.exports = {
	VigenereCipheringMachine,
}
