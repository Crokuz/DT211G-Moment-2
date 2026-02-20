let allCourses = [];

document.addEventListener("DOMContentLoaded", async () => {
    await getCourses();  
    document.querySelector("#search").addEventListener("input", filterCourses);
    document.querySelector("#sort").addEventListener("change", sortCourses);
});

function filterCourses(input) {
    const searchPhrase = input.target.value.toLowerCase();

    const filtered = allCourses.filter(course =>
        course.code.toLowerCase().includes(searchPhrase) ||
        course.coursename.toLowerCase().includes(searchPhrase) ||
        course.progression.toLowerCase().includes(searchPhrase)
    );

    displayData(filtered);
}

function sortCourses(input) {
    const sortBy = input.target.value;

    /*Använder localeCompare istället för till exempel en "ternary operator"
    för att sorteringen ska fungera korrekt med svenska bokstäver*/
    const sorted = [...allCourses].sort((a, b) => {
        return a[sortBy].localeCompare(b[sortBy]);
    });

    displayData(sorted);
}

async function getCourses() {
    const url ="https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const response = await fetch(url);
        const courses = await response.json();

        allCourses = courses;
        displayData(allCourses);

    } catch (error) {
        console.error("Error: " + error);
    }
}

function displayData(courses) {
    const table = document.querySelector("#courses");

    table.innerHTML = `
        <thead>
            <tr>
                <th>Kurskod</th>
                <th>Namn</th>
                <th>Progression</th>
            </tr>
        </thead>
        <tbody>
            ${courses.map(course => `
                <tr>
                    <td>${course.code}</td>
                    <td>${course.coursename}</td>
                    <td>${course.progression}</td>
                </tr>
            `).join("")}
        </tbody>
    `;
}