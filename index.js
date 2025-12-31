import http from 'http';
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
    }else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not Found' }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});