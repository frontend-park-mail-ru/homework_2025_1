/**
 * Анализатор почтовых адресов
 * @param {string} str - строка, содержащая почтовые адреса
 * 
 * @returns {Object} Объект с количеством email, списком уникальных email и самым часто встречающимся email
 * 
 * @example
 * const result = emailAnalyzer("test@example.com, test@example.com, user@domain.com");
 * console.log(result);
 * // {
 * //   emailCount: 3,
 * //   uniqueEmails: ['test@example.com', 'user@domain.com'],
 * //   mostFrequentEmail: 'test@example.com'
 * // }
 */
const emailAnalyzer = (str) => {
	let result = {
		emailCount: 0,
        uniqueEmails: [],
        mostFrequentEmail: ""
	};

	const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/g;
	const emails = str.match(emailRegex) || [];

	result.emailCount = emails.length;
	const lowerCaseEmails = emails.map(email => email.toLowerCase());
	result.uniqueEmails = [...new Set(lowerCaseEmails)];

	let max_amount = 0;
	for(let i = 0; i < lowerCaseEmails.length; i++){
		let current = 0;
		for(let j = 0; j < lowerCaseEmails.length; j++){
			if(lowerCaseEmails[i] == lowerCaseEmails[j]){
				current++;
			}
		}
		if(max_amount<current){
			max_amount = current;
			result.mostFrequentEmail = lowerCaseEmails[i];
		}
	}

	return result;
};
