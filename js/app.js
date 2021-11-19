/* MAKE A FAKE STUDENT TEST SCORE SERVICE */

/**
 * Represents a student with test scores
 * @constructor
 * @param {string} name - Student name
 * @param {number} mathScore - Student's math score
 * @param {number} physicalScore - Student's physical score
 * @param {number} chemistryScore - Student's chemistry score
 */
class TestScore {
	constructor(name, mathScore, physicalScore, chemistryScore) {
		this.name = name;
		this.mathScore = mathScore;
		this.physicalScore = physicalScore;
		this.chemistryScore = chemistryScore;
	}

	getScoreAverage() {
		const mathScore = parseFloat(this.mathScore);
		const physicalScore = parseFloat(this.physicalScore);
		const chemistryScore = parseFloat(this.chemistryScore);
		const scoreAverage = ((mathScore + physicalScore + chemistryScore) / 3).toFixed(1);
		return scoreAverage;
	}

	isExcellent() {
		const scrAvg = parseFloat(this.getScoreAverage());
		return scrAvg >= 8 ? true : false;
	}
}

/**
 * Generate student ID
 * @returns {number}
 */
const studentIdGenerate = (function() {
	let id = 0;
	return function() {
		id++;
		return `stud${id}`;
	};
})();

/**
 * Students data initialize
 * @type {array}
 */
const students = [];

/**
 * Get All Students Data
 * @returns {array}
 */
function getStudents() {
	return students;
}

/**
 * Get a student data by ID
 * @param {string} id - Student ID
 * @returns {object}
 */
function getStudentById(id) {
	return students.find((s) => s.id === id);
}

/**
 * Add new student to data @see {@link formatScore}
 * @returns {object}
 */
function addStudent(name, mathScore, physicalScore, chemistryScore) {
	const fmMathScore = formatScore(mathScore);
	const fmPhysicalScore = formatScore(physicalScore);
	const fmChemistryScore = formatScore(chemistryScore);

	const newStudent = new TestScore(name, fmMathScore, fmPhysicalScore, fmChemistryScore);
	newStudent.id = studentIdGenerate();
	students.push(newStudent);

	return newStudent;
}

/**
 * Update existing student from data @see {@link formatScore}
 * @returns {object}
 */
function updateStudent(id, name, mathScore, physicalScore, chemistryScore) {
	const fmMathScore = formatScore(mathScore);
	const fmPhysicalScore = formatScore(physicalScore);
	const fmChemistryScore = formatScore(chemistryScore);

	const student = students.find((s) => s.id === id);
	student.name = name;
	student.mathScore = fmMathScore;
	student.physicalScore = fmPhysicalScore;
	student.chemistryScore = fmChemistryScore;

	return student;
}

/**
 * Delete existing student from data
 * @returns {object}
 */
function deleteStudent(id) {
	const studentIndex = students.findIndex((s) => s.id === id);
	const deletedStudent = students[studentIndex];
	students.splice(studentIndex, 1);
	return deletedStudent;
}

/**
 * Generate seeds if needed
 */
function seeds() {
	addStudent('Hoài An', 7.5713123, 0, 8.5);
	addStudent('Văn Nam', 8, 9, 8.5);
	addStudent('Tường Vi', 9, 9, 8.5);
	addStudent('James River', 9, 9, 9);
	addStudent('Mark Thomas', 7.9, 10, 8.125);
	addStudent('Nhật Trường', 9, 9, 9);
	addStudent('Susan', 8.6, 9.5, 8.75);
	addStudent('Donald Trung', 5.5, 6.6, 9.9);
	addStudent('Tony Stone', 3, 4.123123, 6.123123123);
}

/**
 * Format a score from a number or string input to a fixed string
 * @returns {string}
 */
function formatScore(score) {
	const scr = parseFloat(score) || 0;
	fmScore = scr === Math.floor(scr) ? scr.toFixed(0) : scr.toFixed(1);
	return fmScore;
}

/* UPDATE DOM */

/* Initialize variables for HTML Elements */
const tableContent = document.getElementById('table-content');
const addInfoBtn = document.getElementById('add-info-btn');
const getInfoForm = document.forms['get-info-form'];
const infoRows = document.getElementById('info-rows');
const errorMessage = document.getElementById('error-message');
const calcAvgBtn = document.getElementById('calc-avg-btn');
const markExcBtn = document.getElementById('mark-exc-btn');

/**
 * Initialize error message if user enter wrong informations
 * @type {string}
 */
const errorContent =
	'Thông tin bạn nhập chưa hợp lệ. Điểm số phải nằm trong khoảng từ 0 đến 10, và tên không được bỏ trống. Xin vui lòng nhập lại.';
/**
 * Initialize class for input readonly @see {@link handleEdit}
 * @type {string}
 */
const readonlyClassName = 'border-0';
/**
 * Initialize class for input after disable readonly @see {@link handleEdit}
 * @type {string}
 */
const editableClassName = 'border-1';

/* Main statements */
addInfoBtn.addEventListener('click', addInfoToTable);
calcAvgBtn.addEventListener('click', toggleCalcAvg);
markExcBtn.addEventListener('click', toggleMarkExc);
updateTable();

/**
 * Update table on every data change, inside are 2 other functions: @see {@link addStudentRows} and @see {@link handleRowClick}
 */
function updateTable() {
	const students = getStudents();
	tableContent.style.display = students.length ? 'block' : 'none';
	const rows = students.map(addStudentRows).join('');
	infoRows.innerHTML = rows;

	if (students.length) {
		const studentRows = document.querySelectorAll('.student-row');
		studentRows.forEach((r) => {
			r.addEventListener('click', handleRowClick);
		});
	}
}

/**
 * Add row containing student data to DOM
 * @param {object} student - Student object
 * @param {number} index - Index of student object in data
 * @returns {string}
 */
function addStudentRows(student, index) {
	return `<tr  
              class="student-row"
              data-id="${student.id}"
            >
          <th scope="row">${index + 1}</th>
          <td>${student.name}</td>
          <td>
            <input 
              id="${student.id}-math"
              type="number"
              class="bg-white text-end ${readonlyClassName}"
              value="${student.mathScore}"
              readonly
              style="width:3rem; color:inherit"
            >
          </td>
          <td>
            <input 
              id="${student.id}-physical"
              type="number"
              class="bg-white text-end ${readonlyClassName}"
              value="${student.physicalScore}"
              readonly
              style="width:3rem; color:inherit"
            >          
          </td>
          <td>
            <input 
              id="${student.id}-chemistry"
              type="number"
              class="bg-white text-end ${readonlyClassName}"
              value="${student.chemistryScore}"
              readonly
              style="width:3rem; color:inherit"
            >   
          </td>
          <td class="score-average">?</td>
          <td>
            <i 
              class="edit-btn bi bi-pencil-square me-3"
            ></i>
            <i 
              class="save-btn bi bi-check2-square me-3"
              style='display:none;'
            ></i>
            <i 
              class="delete-btn bi bi-trash"
            ></i>
    </tr>`;
}

/**
 * Get and validate data from a form then add to data students and update DOM
 * @param {object} e - event
 */
function addInfoToTable(e) {
	e.preventDefault();
	const name = getInfoForm['student-name'].value;
	const mathScore = getInfoForm['math-score'].value || 0;
	const physicalScore = getInfoForm['physical-score'].value || 0;
	const chemistryScore = getInfoForm['chemistry-score'].value || 0;

	if (name && validateScore(mathScore, physicalScore, chemistryScore)) {
		addStudent(name, mathScore, physicalScore, chemistryScore);
		updateTable();
		getInfoForm.reset();
		errorMessage.innerHTML = '';
	} else {
		errorMessage.innerHTML = errorContent;
	}
}

/**
 * Validate if score is between 0 and 10
 * @param  {...any} scores - Scores to be validated
 * @returns {boolean}
 */
function validateScore(...scores) {
	return scores.every((s) => parseFloat(s) >= 0 && parseFloat(s) <= 10);
}

/**
 * Handle every click on row specific targets, @see {@link handleEdit}, @see {@link handleSave}, @see {@link handleDelete}
 * @param {object} e - Event
 */
function handleRowClick(e) {
	const studentId = this.attributes['data-id'].value;

	if (e.target.className.includes('edit-btn')) {
		handleEdit(this, studentId);
	}

	if (e.target.className.includes('save-btn')) {
		handleSave(this, studentId);
	}

	if (e.target.className.includes('delete-btn')) {
		handleDelete(studentId);
	}
}

/**
 * This will set input's readOnly to false, change some style and allow user to edit the input values, @see {@link disableReadOnly}
 * @param {object} studentRow - The row element which contains student data
 * @param {string} id - Student ID
 */
function handleEdit(studentRow, id) {
	const editBtn = studentRow.querySelector('.edit-btn');
	const saveBtn = studentRow.querySelector('.save-btn');
	const mathCell = studentRow.querySelector(`#${id}-math`);
	const physicalCell = studentRow.querySelector(`#${id}-physical`);
	const chemistryCell = studentRow.querySelector(`#${id}-chemistry`);

	disableReadOnly(mathCell, editBtn, saveBtn);
	disableReadOnly(physicalCell, editBtn, saveBtn);
	disableReadOnly(chemistryCell, editBtn, saveBtn);
}

/**
 * Disable readOnly for inputs, add border to inputs, switch display the buttons (editBtn and saveBtn will replace each other)
 * @param {object} input - The inputs which will be set readOnly to false
 * @param  {...any} buttons - Buttons that will switch displaying
 */
function disableReadOnly(input, ...buttons) {
	buttons.forEach((b) => {
		b.style.display = b.style.display === '' ? 'none' : '';
	});

	input.readOnly = input.readOnly === false;

	const currentClassName = input.className;
	input.className = currentClassName.replace(readonlyClassName, editableClassName);
}

/**
 * Get and validate new inputs, then update the data and update the table, @see {@link validateScore}, @see {@link updateStudent}, @see {@link updateTable}
 * @param {object} studentRow - Student object
 * @param {string} id - Student ID
 */
function handleSave(studentRow, id) {
	const mathCell = studentRow.querySelector(`#${id}-math`);
	const physicalCell = studentRow.querySelector(`#${id}-physical`);
	const chemistryCell = studentRow.querySelector(`#${id}-chemistry`);
	const name = getStudentById(id).name;

	if (validateScore(mathCell.value, physicalCell.value, chemistryCell.value)) {
		updateStudent(id, name, mathCell.value, physicalCell.value, chemistryCell.value);
		updateTable();
	} else {
		mathCell.style.color = 'red';
		physicalCell.style.color = 'red';
		chemistryCell.style.color = 'red';
	}
}

/**
 * Delete student from data @see {@link deleteStudent}, @see {@link updateTable}
 * @param {string} id - Student ID
 */
function handleDelete(id) {
	deleteStudent(id);
	updateTable();
}

/**
 * Toggle score average calculate each time user click the Calculate button
 */
function toggleCalcAvg() {
	const students = getStudents();
	const scoreAverageCells = document.querySelectorAll('.score-average');

	students.forEach((s, i) => {
		scoreAverage = s.getScoreAverage();
		const srcAvgDisplay = scoreAverageCells[i].innerHTML;
		scoreAverageCells[i].innerHTML = srcAvgDisplay === '?' ? scoreAverage : '?';
	});
}

/**
 * Toggle excellent student row mark/highlight with red color text each time user click the Find Excellent Student button
 */
function toggleMarkExc() {
	const students = getStudents();
	const studentRows = document.querySelectorAll('.student-row');

	students.forEach((s, i) => {
		const studentRowColor = studentRows[i].style.color;

		if (s.isExcellent()) {
			studentRows[i].style.color = studentRowColor === '' ? 'red' : '';
		}
	});
}
