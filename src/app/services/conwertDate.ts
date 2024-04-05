import { DateBi } from '../type/type'

const convertData = (date: Date): DateBi => {
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	}
}
export default convertData
