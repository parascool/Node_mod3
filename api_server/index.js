const express = require('express');
const fs = require('fs').promises;
const cors = require("cors")

const app = express();
const port = 5050;
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employees = JSON.parse(await fs.readFile('./employee.json'));
        const employee = employees.find(emp => emp.id === id);
        if (!employee) {
            res.status(404).send('Employee not found');
            return;
        }
        res.json(employee);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/project/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const projects = JSON.parse(await fs.readFile('./project.json'));
        const project = projects.find(proj => proj.id === id);
        if (!project) {
            res.status(404).send('Project not found');
            return;
        }
        res.json(project);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getemployeedetails', async (req, res) => {
    try {
        const employees = JSON.parse(await fs.readFile('./employee.json'));
        if (!employees) {
            res.status(404).send('Employee not found');
            return;
        }
        const projects = JSON.parse(await fs.readFile('./project.json'));
        if (!projects) {
            res.status(404).send('Project not found');
            return;
        }
        const result = {
            employee: employees,
            project: projects
        };
        res.json(result);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/getemployeedetails/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employees = JSON.parse(await fs.readFile('./employee.json'));
        const employee = employees.find(emp => emp.id === employeeId);
        if (!employee) {
            res.status(404).send('Employee not found');
            return;
        }
        const projectId = employee.projectId;
        const projects = JSON.parse(await fs.readFile('./project.json'));
        const project = projects.find(proj => proj.id === projectId);
        if (!project) {
            res.status(404).send('Project not found');
            return;
        }
        const result = {
            employee: employee,
            project: project
        };
        res.json(result);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
