import http from 'http';
import { url } from 'inspector';
import {v4} from 'uuid';
const port = 3000;


const grades = []
const server = http.createServer((req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const id = url.split('/')[2];

        if (req.method === 'GET' && req.url === '/grades') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(grades));

        }
        else if (req.method === 'POST' && req.url === '/grades') {
            const {studentName, subject, grade} = JSON.parse(body);
            const newGrade = {id: v4(), studentName, subject, grade };
            grades.push(newGrade);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Grade added successfully' }));
        }
        else if (url.startsWith('/grades/') && req.method === 'PUT') {
            const {studentName, subject, grade, id} = JSON.parse(body);
            const gradeToUpdate = grades.find(g => g.id === id);
            if (gradeToUpdate) {
                gradeToUpdate.studentName = studentName
                gradeToUpdate.subject = subject
                gradeToUpdate.grade = grade
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(gradeToUpdate));
            }else {
                res.writeHead(404, {'content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Grade not found'}));
            }
        }else if (url.startsWith('/grades/') && req.method === 'DELETE') {
            const index = grades.findIndex(g => g.id === id);
            if (index !== -1) {
                grades.splice(index, 1);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Grade deleted successfully' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Grade not found' }));
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not Found' }));
        }
    });
});
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});