let allCourses = [];

document.addEventListener("DOMContentLoaded", async () => {
    await getCourses();  
    document.querySelector("#search").addEventListener("input", filterCourses);
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