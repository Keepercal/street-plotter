import { ageCategories } from '@/config/ageCatagories';

function getAgeCategory(days) {
	if (days == null) {
		return ageCategories.at(-1);
	}

	return ageCategories.find(({ maxDays }) => days <= maxDays);
}

export default function getColourByAge(days) {
	return getAgeCategory(days).color;
}
