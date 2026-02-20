document.addEventListener("DOMContentLoaded", async () => {
    getCourses();   
});

async function getCourses() {
    const url ="https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const response = await fetch(url);

        const courses = await response.json();
        console.log(courses);
        displayData(courses);
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