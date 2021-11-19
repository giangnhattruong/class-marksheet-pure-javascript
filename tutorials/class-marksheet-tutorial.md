Đây là tutorial mô tả chức năng và hoạt động của các hàm và biến theo từng bước, được chia thành 3 phần.

Phần 1 - Tạo HTML với một số Elements cần thiết (form, buttons,...), sử dụng Bootstrap và Boostrap Icons

Phần 2 - Tạo một service giả API có đầy đủ các chức năng: đọc, thêm, sửa, xóa (từ dòng 1 - 136)
1. Tạo một class làm template cho data tên là TestScore với 4 properties name, mathScore, physicalScore, chemistryScore và 2 methods getScoreAverage(), isExcellent().
2. Khỏi tạo data students là [] để chứa những student object con.
2. Khởi tạo một function closure để tạo ID cho mỗi student object mỗi khi object này được thêm vào data students.
3. Khai báo funtion getStudents() và getStudentById() để lấy data.
4. Khai báo function addStudent() để thêm student object mới vào data.
5. Khai báo function updateStudent() để cập nhật student object dã tồn tại trong data.
6. Khai báo function deleteStudent() để xóa một student object dã tồn tại trong data.
7. Khai báo function seeds() để tự động thêm 9 object có sẵn vào data, sử dụng để test.
7. Khai báo function formatScore() để format lại định dạng số cho phù hợp, dùng để hỗ trợ 2 functions addStudent() và updateStudent().

Phần 3 - Thao tác trên DOM (từ dòng 140 - 387)
1. Khai báo sẵn các biến cho các Elements trong HTML.
2. Khai báo các biến string errorContent (dùng trong function addInfoToTable()), readonlyClassName và editableClassName (dùng trong function disableReadOnly()).
3. Chạy các statements methods addEventListener, cũng như chạy function updateTable() lần đầu tiên để giấu phần nội dung trong bảng (bảng trống).
4. Khai báo funtion updateTable() để cập nhật bảng theo dữ liệu function getStudents() lấy từ Phần 1, sử dụng function addStudentRows() để thêm table row vào HTML. Nếu kiểm tra thấy có data từ function getStudents() thì thực hiện addEventListener với function handleRowClick() cho các row có data trong bảng.
5. Khai báo function addStudentRows() sử dụng trong function updateTable() ở trên.
6. Khai báo function addInfoToTable() để lấy giá trị trong form, nếu validate name và validate scores với function validateScore() ok thì thực hiện thêm student object vào data, ngay sau đó chạy function updateTable() để cập nhật lại nội dung hiển thị, nếu validate thất bại thì sẽ báo lỗi.
7. Khai báo functions validateScore() sử dụng trong function addInfoToTable() khi thêm data và function handleSave() khi chỉnh sửa data.
8. Khai báo function handleRowClick() để thực hiện các functions handleEdit(), handleSave() hay handleDelete() tùy theo event target là editBtn, saveBtn hay deleteBtn.
9. Khai báo function handleEdit() kết hợp với function disableReadOnly() để hiện ra form chỉnh sửa thông tin trong row.
10. Khai báo function handleSave() kết hợp với function validateScore() kiểm tra thông tin mới, nếu phù hợp thì sẽ chỉnh sửa lại student object được chọn theo ID, nếu không thì sẽ highlight màu đỏ báo lỗi, sau đó chạy function updateTable() để cập nhật lại nội dung hiển thị.
11. Khai báo function handleDelete() để delete student object dược chọn theo ID, sau đó chạy function updateTable() để cập nhật lại nội dung hiển thị.
12. Khai báo function toggleCalcAvg() để tính tất cả điểm trung bình và hiển thị lên trên bảng, sử dụng method getScoreAverage() từ constructor TestScore.
13. Khai báo function toggleMarkExc() để tìm ra các học viên đạt danh hiểu giỏi và đánh dấu lên trên bảng, sử dụng method isExcellent() từ constructor TestScore.

