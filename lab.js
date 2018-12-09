const option = {
	first: 1,
	last: 2,
};
let students = new Array();

//create class student
class Student {
	constructor(name, age, isFelmale) {
		this.name 		= name;
		this.age 		= age;
		this.isFelmale 	= isFelmale;
	}

	//add new student into list
	static addStudent(name, age, isFelmale) {
		if (name == '') {
			return console.log(new Error('The name Student is require!'));
		}

		if (age == undefined || !Number.isInteger(age)) {
			return console.log(new Error('The age Student is require and integer!'));
		}

		if (isFelmale == undefined || (isFelmale !== false && isFelmale !== true)) {
			return console.log(new Error('The age Student is require and boolean!'));
		}

		let student = {
			name: name,
			age: age,
			isFelmale: isFelmale,
		};
		//add student into list
		let totalStudents = students.length;
		students.push(student);

		if (students.length - totalStudents <= 0) {
			return console.log(new Error('Has problem when add new a Student. please try again!'));	
		}

		console.log(this.showDetailStudent(student, 'add sucsses!'));
	}

	//get student by index
	static getStudentByIndex(index, isPrint) {
		if (index === undefined || !Number.isInteger(index)) {
			return console.log(new Error('The age Student is require and integer!'));
		}

		if (students[index] === undefined) {
			return console.log('Not find Student in list!');
		}

		if (isPrint) {
			console.log(this.showDetailStudent(students[index], ''));
		} else {
			return students[index];
		}
	}

	//get student by properties student
	static getStudentByProperties(propertiesName, value, getOption) {
		if (value === undefined) {
			return console.log(new Error('The properties name of Student is empty!'));
		}

		let indexStudentsSearch = new Array();
		for (let i = 0; i < students.length; i++) {
			let student = this.getStudentByIndex(i);
			if (student[propertiesName] !== undefined) {
				let propertiesValue = student[propertiesName];
				if (typeof value == 'string' || typeof propertiesValue == 'string') {
					propertiesValue = propertiesValue.toLowerCase();
					value = value.toLowerCase();
				}
				
				if (propertiesValue == value) {
					indexStudentsSearch.push(i);
				}
			}
		}

		if (indexStudentsSearch.length === 0) {
			return console.log('Not find Student in list!');
		}
		
		switch(getOption) {
			case option.first:
				return indexStudentsSearch[0];
				break;
			case option.last:
				return indexStudentsSearch.pop();
				break;
			default:
				return indexStudentsSearch;
		}
	}

	//delete a student
	static deleteStudent(propertiesName, value, getOption) {
		let indexStudentsSearch = this.getStudentByProperties(propertiesName, value, getOption);
		let totalStudents = students.length;
		if (Array.isArray(indexStudentsSearch)) {
			for (const index of indexStudentsSearch) {
				this.deleteStudent(propertiesName, value, option.first);
			}
		} else {
			deleteElementsByIndex(indexStudentsSearch, students);
		}
	}

	//get list students
	static getListStudents() {
		for (const student of students) {
			console.log(this.showDetailStudent(student, ''));
		}
	}

	// show detail student
	static showDetailStudent(student, msg) {
		if (msg !== undefined) {
			msg = ' ' + msg;
		}

		return 'Student name ' + student.name + ' age ' + student.age + ' sex ' + getSexStudent(student.isFelmale) + msg;
	}

}

//call class
console.log('------Call method addStudent------');
Student.addStudent('Nhut', 25, false);
Student.addStudent('Nam', 25, false);
Student.addStudent('Nu', 21, true);
Student.addStudent('Hong', 23, true);
Student.addStudent('Nhut', 22, true);
Student.addStudent('Nhut2', 22, true);
Student.addStudent('Nhut', 19, true);
Student.getStudentByIndex(1, true);
console.log('------Call method getStudentByProperties------');
console.log(Student.getStudentByProperties('name', 'nhut'));
console.log('------Call method deleteStudent------');
console.log(Student.deleteStudent('name', 'nhut', option.first));
console.log('------Show list stutdents------');
Student.getListStudents();

// hepler
function getSexStudent(isFelmale)
{
	sex = 'Male';
	if (isFelmale) {
		sex = 'Female';
	}

	return sex;
}

function deleteElementsByIndex(index, arr) {
	for (let i = 0; i<arr.length; i++) {
		if (i == index && arr[i] !== undefined) {
			arr.splice(index,1);
		}
	}
}