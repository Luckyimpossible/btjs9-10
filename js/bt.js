$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $('#btnThem').on('click', function () {
        $('#myModal').modal('show');
        $('#header-title').text('Add New Employee');
        $('#btnThemNV').show();
        $('#btnCapNhat').hide();
        clearForm();
    });
    $('#btnTimNV').on('click', function () {
        const searchTerm = $('#searchName').val().toLowerCase();
        filterEmployees(searchTerm);
    });

    $('#btnThemNV').on('click', function () {
        const account = $('#tknv').val();
        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const workDate = $('#datepicker').val();
        const salary = $('#luongCB').val();
        const role = $('#chucvu').val();
        const workHours = $('#gioLam').val();

        if (validateForm()) {
            const newEmployee = {
                account: account,
                name: name,
                email: email,
                password: password,
                workDate: workDate,
                salary: salary,
                role: role,
                workHours: workHours
            };
            addEmployee(newEmployee);
            $('#myModal').modal('hide');
        }
    });

    // Update Employee Data
    $('#btnCapNhat').on('click', function () {
        const account = $('#tknv').val();
        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const workDate = $('#datepicker').val();
        const salary = $('#luongCB').val();
        const role = $('#chucvu').val();
        const workHours = $('#gioLam').val();

        if (validateForm()) {
            const updatedEmployee = {
                account: account,
                name: name,
                email: email,
                password: password,
                workDate: workDate,
                salary: salary,
                role: role,
                workHours: workHours
            };
            updateEmployee(updatedEmployee);
            $('#myModal').modal('hide');
        }
    });

    $('#SapXepTang').on('click', function () {
        sortTable(true);
    });

    $('#SapXepGiam').on('click', function () {
        sortTable(false);
    });

    function createPagination(totalPages) {
        const pagination = $('#ulPhanTrang');
        pagination.empty();
        for (let i = 1; i <= totalPages; i++) {
            pagination.append(`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`);
        }
    }

    function validateForm() {
        let isValid = true;
        if ($('#tknv').val() === '') {
            $('#tbTKNV').text('Tài khoản không được bỏ trống');
            isValid = false;
        }
        if ($('#name').val() === '') {
            $('#tbTen').text('Họ và tên không được bỏ trống');
            isValid = false;
        }
        if ($('#email').val() === '') {
            $('#tbEmail').text('Email không được bỏ trống');
            isValid = false;
        }
        if ($('#password').val() === '') {
            $('#tbMatKhau').text('Mật khẩu không được bỏ trống');
            isValid = false;
        }
        if ($('#datepicker').val() === '') {
            $('#tbNgay').text('Ngày làm không được bỏ trống');
            isValid = false;
        }
        if ($('#luongCB').val() === '') {
            $('#tbLuongCB').text('Lương cơ bản không được bỏ trống');
            isValid = false;
        }
        if ($('#chucvu').val() === 'Chọn chức vụ') {
            $('#tbChucVu').text('Chức vụ không được bỏ trống');
            isValid = false;
        }
        if ($('#gioLam').val() === '') {
            $('#tbGiolam').text('Giờ làm không được bỏ trống');
            isValid = false;
        }
        return isValid;
    }

    function clearForm() {
        $('#tknv').val('');
        $('#name').val('');
        $('#email').val('');
        $('#password').val('');
        $('#datepicker').val('');
        $('#luongCB').val('');
        $('#chucvu').val('Chọn chức vụ');
        $('#gioLam').val('');
    }

    function addEmployee(employee) {
        const newRow = `<tr>
            <td>${employee.account}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.workDate}</td>
            <td>${employee.role}</td>
            <td>${employee.salary}</td>
            <td>New</td>
            <td>
                <button class="btn btn-warning btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
        $('#tableDanhSach').append(newRow);
    }

    function updateEmployee(employee) {
        $('#tableDanhSach tr').each(function () {
            const rowAccount = $(this).find('td').first().text();
            if (rowAccount === employee.account) {
                $(this).find('td').eq(1).text(employee.name);
                $(this).find('td').eq(2).text(employee.email);
                $(this).find('td').eq(3).text(employee.workDate);
                $(this).find('td').eq(4).text(employee.role);
                $(this).find('td').eq(5).text(employee.salary);
            }
        });
    }

    function filterEmployees(searchTerm) {
        $('#tableDanhSach tr').each(function () {
            const rowAccount = $(this).find('td').first().text().toLowerCase();
            if (rowAccount.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    function sortTable(ascending) {
        const rows = $('#tableDanhSach tr').get();
        rows.sort(function (a, b) {
            const accountA = $(a).find('td').first().text().toLowerCase();
            const accountB = $(b).find('td').first().text().toLowerCase();
            if (ascending) {
                return accountA < accountB ? -1 : 1;
            } else {
                return accountA > accountB ? -1 : 1;
            }
        });
        $.each(rows, function (index, row) {
            $('#tableDanhSach').append(row);
        });
    }
    createPagination(5);
});
