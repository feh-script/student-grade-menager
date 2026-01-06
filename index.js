import http from 'http';
import {v4} from 'uuid';
const port = 3000;


const grades = [{
    studentName: 'Alice',
    subject: 'Math',
    grade: '8'
}]
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/grades') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(grades));

    }else if (req.method === 'POST' && req.url === '/grades') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const {studentName, subject, grade} = JSON.parse(body);
            const newGrade = {id: v4(), studentName, subject, grade };
            grades.push(newGrade);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Grade added successfully' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not Found' }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});