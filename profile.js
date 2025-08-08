document.addEventListener("DOMContentLoaded", function () {
    // ✅ Show username from localStorage
    const username = localStorage.getItem("username") || "Guest";
    const welcomeEl = document.getElementById("welcomeMsg");
    if (welcomeEl) {
        welcomeEl.textContent = `Welcome, ${username}!`;
    }

    const table = document.getElementById("attendanceTable");
    const saveBtn = document.getElementById("save");
    const clearBtn = document.getElementById("clear");

    // ✅ Add dropdowns and extra cells to each row
    for (let r = 1; r < table.rows.length; r++) {
        let row = table.rows[r];

        // Add 31 days dropdown
        for (let c = 1; c <= 31; c++) {
            let cell = row.insertCell(-1);
            let select = document.createElement("select");
            ["", "Present", "Absent", "Cancel"].forEach(opt => {
                let option = document.createElement("option");
                option.value = opt;
                option.textContent = opt;
                select.appendChild(option);
            });
            select.addEventListener("change", () => calculateTotals(r));
            cell.appendChild(select);
        }

        // Add T, P, A, X, %
        for (let c = 0; c < 5; c++) {
            row.insertCell(-1).textContent = "0";
        }
    }

    // ✅ Calculate totals for one row
    function calculateTotals(rowIndex) {
        let row = table.rows[rowIndex];
        let total = 0, present = 0, absent = 0, cancel = 0;

        for (let c = 1; c <= 31; c++) {
            let value = row.cells[c].querySelector("select").value;
            if (value === "Present") {
                total++;
                present++;
            } else if (value === "Absent") {
                total++;
                absent++;
            } else if (value === "Cancel") {
                cancel++;
            }
        }

        row.cells[32].textContent = total;      // T
        row.cells[33].textContent = present;    // P
        row.cells[34].textContent = absent;     // A
        row.cells[35].textContent = cancel;     // X
        row.cells[36].textContent = total > 0 ? ((present / total) * 100).toFixed(1) + "%" : "0%";
    }

    // ✅ Save button
    saveBtn.addEventListener("click", function () {
        let data = [];
        for (let r = 1; r < table.rows.length; r++) {
            let rowData = [];
            for (let c = 1; c <= 31; c++) {
                rowData.push(table.rows[r].cells[c].querySelector("select").value);
            }
            data.push(rowData);
        }
        localStorage.setItem("attendanceData", JSON.stringify(data));
        alert("Attendance saved!");
    });

    // ✅ Clear button
    clearBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to clear all attendance?")) {
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c <= 31; c++) {
                    table.rows[r].cells[c].querySelector("select").value = "";
                }
                calculateTotals(r);
            }
            localStorage.removeItem("attendanceData");
        }
    });

    // ✅ Load saved data
    const savedData = JSON.parse(localStorage.getItem("attendanceData"));
    if (savedData) {
        for (let r = 1; r < table.rows.length; r++) {
            for (let c = 1; c <= 31; c++) {
                table.rows[r].cells[c].querySelector("select").value = savedData[r - 1][c - 1];
            }
            calculateTotals(r);
        }
    }
});
