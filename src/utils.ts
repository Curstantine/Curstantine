import { BIRTH_DATE } from "./constants";

export const getAge = (): number => {
	const today = new Date();
	const age = today.getFullYear() - BIRTH_DATE.getFullYear();
	const month = today.getMonth() - BIRTH_DATE.getMonth();

	if (month < 0 || (month === 0 && today.getDate() < BIRTH_DATE.getDate())) {
		return age - 1;
	}

	return age;
};
